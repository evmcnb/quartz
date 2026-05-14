---
tags:
  - Endocrinology
title: Snippet Template
date: 2023-09-27
date modified: 2025-04-23
---

<iframe width="100%" height="750" frameBorder="0" srcdoc="
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <style>
        :root {
            --bg: #1e1e1e;
            --panel-bg: #252526;
            --text: #d4d4d4;
            --accent: #0e639c;
            --dka-color: #f43f5e;
            --hhs-color: #f59e0b;
            --hypo-color: #10b981;
            --border: #333;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            height: 100box-sizing: border-box;
            overflow-x: hidden;
        }
        h2 { margin: 0; font-size: 1.4rem; color: #fff; text-align: center; }
        .controls {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            background: var(--panel-bg);
            padding: 12px;
            border-radius: 8px;
            border: 1px solid var(--border);
        }
        button {
            background: #3a3d41;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.2s;
        }
        button:hover { background: #4a4d51; }
        button.active-dka { background: var(--dka-color); color: white; }
        button.active-hhs { background: var(--hhs-color); color: black; }
        button.active-hypo { background: var(--hypo-color); color: black; }
        button.reset { background: transparent; border: 1px solid #666; }
        
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 10px;
        }
        .gauge {
            background: var(--panel-bg);
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid var(--border);
            position: relative;
        }
        .gauge-title { font-size: 0.75rem; color: #888; text-transform: uppercase; margin-bottom: 5px; }
        .gauge-value { font-size: 1.3rem; font-weight: bold; font-family: monospace; }
        .unit { font-size: 0.75rem; font-weight: normal; color: #aaa; }
        
        canvas {
            background: var(--panel-bg);
            border-radius: 8px;
            border: 1px solid var(--border);
            width: 100%;
            height: 380px;
            display: block;
        }
        .summary-box {
            background: var(--panel-bg);
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #666;
            font-size: 0.9rem;
            line-height: 1.4;
            min-height: 48px;
        }
    </style>
</head>
<body>

    <h2>Glycemic Emergencies Simulator (UK Units)</h2>
    
    <div class='controls'>
        <button id='btn-normal' class='reset' onclick='setState(&quot;normal&quot;)'>Normal Physiology</button>
        <button id='btn-dka' onclick='setState(&quot;dka&quot;)'>Trigger DKA</button>
        <button id='btn-hhs' onclick='setState(&quot;hhs&quot;)'>Trigger HHS</button>
        <button id='btn-hypo' onclick='setState(&quot;hypo&quot;)'>Trigger Hypo</button>
    </div>

    <div class='dashboard'>
        <div class='gauge'><div class='gauge-title'>Blood Glucose</div><div id='g-glucose' class='gauge-value'>5.5 <span class='unit'>mmol/L</span></div></div>
        <div class='gauge'><div class='gauge-title'>Blood Ketones</div><div id='g-ketones' class='gauge-value'>0.1 <span class='unit'>mmol/L</span></div></div>
        <div class='gauge'><div class='gauge-title'>Blood pH</div><div id='g-ph' class='gauge-value'>7.40</div></div>
        <div class='gauge'><div class='gauge-title'>Osmolarity</div><div id='g-osmo' class='gauge-value'>285 <span class='unit'>mOsm/kg</span></div></div>
        <div class='gauge'><div class='gauge-title'>Insulin Activity</div><div id='g-insulin' class='gauge-value'>100%</div></div>
    </div>

    <canvas id='simCanvas'></canvas>

    <div id='summary' class='summary-box'>
        Select a physiological state above to observe the metabolic shifts, particle dynamics, and clinical readings.
    </div>

    <script>
        const canvas = document.getElementById('simCanvas');
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });

        // Metrics targets for smooth animation
        const targets = {
            normal:  { glucose: 5.5, ketones: 0.1, ph: 7.40, osmo: 285, insulin: 100, text: '<b>Normal State:</b> Balanced insulin production allows efficient glucose uptake into cells. Lipolysis (fat breakdown) is suppressed. Blood parameters are highly regulated.', border: '#666' },
            dka:     { glucose: 19.5, ketones: 4.5, ph: 7.15, osmo: 302, insulin: 0, text: '<b>DKA Pathophysiology:</b> Absolute insulin deficiency halts glucose uptake. The liver switches to unchecked fatty acid oxidation, dumping acidic ketones into the blood. Triad: Hyperglycemia, Ketosis, Acidosis.', border: '#f43f5e' },
            hhs:     { glucose: 42.0, ketones: 0.4, ph: 7.36, osmo: 345, insulin: 15, text: '<b>HHS Pathophysiology:</b> Relative insulin deficiency limits glucose uptake causing extreme hyperglycemia, driving severe osmotic diuresis and dehydration. However, residual insulin is sufficient to suppress significant ketogenesis.', border: '#f59e0b' },
            hypo:    { glucose: 2.1, ketones: 0.1, ph: 7.41, osmo: 280, insulin: 250, text: '<b>Hypoglycemia Pathophysiology:</b> Insulin excess rapidly clears glucose from the bloodstream, depriving the central nervous system of fuel (neuroglycopenia) and triggering a robust counter-regulatory adrenaline/autonomic response.', border: '#10b981' }
        };

        let current = { glucose: 5.5, ketones: 0.1, ph: 7.40, osmo: 285, insulin: 100 };
        let activeState = 'normal';
        let particles = [];

        class Particle {
            constructor(type) {
                this.spawn(type);
            }
            spawn(type) {
                this.type = type;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 3;
                this.alpha = Math.random() * 0.5 + 0.5;
                
                if (type === 'glucose') {
                    this.color = '#38bdf8';
                    this.vx = (Math.random() - 0.5) * 2;
                    this.vy = (Math.random() - 0.5) * 2;
                } else if (type === 'insulin') {
                    this.color = '#10b981';
                    this.vx = (Math.random() - 0.5) * 4;
                    this.vy = (Math.random() - 0.5) * 4;
                    this.size = 4;
                } else if (type === 'ketone') {
                    this.color = '#f43f5e';
                    this.vx = (Math.random() - 0.5) * 3;
                    this.vy = -Math.random() * 3 - 1; // Rise up
                } else if (type === 'adrenaline') {
                    this.color = '#fbbf24';
                    this.vx = (Math.random() - 0.5) * 8;
                    this.vy = (Math.random() - 0.5) * 8;
                    this.size = 2;
                }
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    // Respawn logic based on active state dynamics
                    let pType = 'glucose';
                    let r = Math.random();
                    if (activeState === 'normal') {
                        pType = r < 0.6 ? 'glucose' : 'insulin';
                    } else if (activeState === 'dka') {
                        pType = r < 0.5 ? 'glucose' : (r < 0.95 ? 'ketone' : 'glucose');
                    } else if (activeState === 'hhs') {
                        pType = r < 0.92 ? 'glucose' : 'insulin';
                    } else if (activeState === 'hypo') {
                        pType = r < 0.6 ? 'insulin' : (r < 0.9 ? 'adrenaline' : 'glucose');
                    }
                    this.spawn(pType);
                }
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                if (this.type === 'ketone') {
                    // Draw triangle for acidic ketones
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particle pool
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(i % 2 === 0 ? 'glucose' : 'insulin'));
        }

        function setState(state) {
            activeState = state;
            document.querySelectorAll('.controls button').forEach(b => b.className = '');
            document.getElementById('btn-normal').classList.add('reset');
            if(state !== 'normal') document.getElementById(`btn-${state}`).classList.add(`active-${state}`);
            
            const t = targets[state];
            document.getElementById('summary').innerHTML = t.text;
            document.getElementById('summary').style.borderLeftColor = t.border;
            
            // Instantly mutate particle composition to show visual shift
            particles.forEach(p => {
                let r = Math.random();
                if (state === 'dka' && r < 0.4) p.spawn('ketone');
                if (state === 'hhs' && p.type === 'ketone') p.spawn('glucose');
                if (state === 'hypo' && r < 0.5) p.spawn('insulin');
            });
        }

        function animate() {
            // Smoothly interpolate metrics toward targets
            const t = targets[activeState];
            current.glucose += (t.glucose - current.glucose) * 0.05;
            current.ketones += (t.ketones - current.ketones) * 0.05;
            current.ph += (t.ph - current.ph) * 0.05;
            current.osmo += (t.osmo - current.osmo) * 0.05;
            current.insulin += (t.insulin - current.insulin) * 0.05;

            // Update DOM Gauges
            document.getElementById('g-glucose').innerHTML = current.glucose.toFixed(1) + &quot; <span class='unit'>mmol/L</span>&quot;;
            document.getElementById('g-ketones').innerHTML = current.ketones.toFixed(1) + &quot; <span class='unit'>mmol/L</span>&quot;;
            document.getElementById('g-ph').innerText = current.ph.toFixed(2);
            document.getElementById('g-osmo').innerHTML = Math.round(current.osmo) + &quot; <span class='unit'>mOsm/kg</span>&quot;;
            document.getElementById('g-insulin').innerText = Math.round(current.insulin) + &quot;%&quot;;

            // Adjust values text coloring based on emergency thresholds
            document.getElementById('g-glucose').style.color = current.glucose > 15 ? '#f59e0b' : (current.glucose < 3.9 ? '#f43f5e' : 'var(--text)');
            document.getElementById('g-ketones').style.color = current.ketones > 1.5 ? '#f43f5e' : 'var(--text)';
            document.getElementById('g-ph').style.color = current.ph < 7.30 ? '#f43f5e' : 'var(--text)';

            // Render Canvas Canvas
            ctx.fillStyle = 'rgba(37, 37, 38, 0.3)'; // Trailing motion effect
            ctx.fillRect(0, 0, width, height);

            // Draw Background Compartments
            ctx.fillStyle = 'rgba(255,255,255,0.02)';
            ctx.fillRect(0, height - 60, width, 60);
            ctx.fillStyle = '#666';
            ctx.font = '11px sans-serif';
            ctx.fillText('CELLULAR / TISSUE UPTAKE ZONE', 15, height - 25);

            // Update & Draw Particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw Legend
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(10, 10, 110, 85);
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#38bdf8'; ctx.fillText('● Glucose', 20, 28);
            ctx.fillStyle = '#10b981'; ctx.fillText('● Insulin', 20, 45);
            ctx.fillStyle = '#f43f5e'; ctx.fillText('▲ Ketones', 20, 62);
            ctx.fillStyle = '#fbbf24'; ctx.fillText('● Adrenaline', 20, 79);
            ctx.restore();

            requestAnimationFrame(animate);
        }

        // Run
        setState('normal');
        animate();
    </script>
</body>
</html>
"></iframe>