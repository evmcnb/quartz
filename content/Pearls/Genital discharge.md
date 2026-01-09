---
tags: [OBGYN]
title: Genital discharge
date: 2023-09-27
date modified: Thursday, January 8th 2026, 10:23:15 am
date created: Thursday, January 8th 2026, 10:08:05 am
---

```mermaid
graph TD
    %% Root Node
    A[Causes of vaginal discharge]

    %% Level 1: Main Categories
    A --> B(Infective)
    A --> C(Non-infective)

    %% Level 2: Non-infective Children
    C --> C1[Physiological]
    C --> C2[Cervical ectopy]
    C --> C3[Foreign body]

    %% Level 2: Infective Categories
    B --> D(Non-STI Vaginal)
    B --> E(STI Vaginal)
    B --> F(STI Endocervical / Urethral)

    %% Level 3: Infective Children (Conditions)
    D --> D1[Bacterial Vaginosis]
    D --> D2[Candida 'Thrush']

    E --> E1[Trichomonas vaginalis]

    F --> F1[Chlamydia trachomatis]
    F --> F2[Neisseria gonorrhoeae]

    %% Styling
    style A fill:#b5d475,stroke:#709b30,stroke-width:2px,color:black
    
    style B fill:#d0e6f5,stroke:#1f689e,stroke-width:2px,color:black
    style C fill:#d0e6f5,stroke:#1f689e,stroke-width:2px,color:black

    style D fill:#f2e6e1,stroke:#a54e28,stroke-width:2px,color:black
    style E fill:#f2e6e1,stroke:#a54e28,stroke-width:2px,color:black
    style F fill:#f2e6e1,stroke:#a54e28,stroke-width:2px,color:black
    
    %% Style the leaf nodes (conditions) simply
    classDef condition fill:#fff,stroke:#333,stroke-width:1px;
    class C1,C2,C3,D1,D2,E1,F1,F2 condition
```

- [[Pearls/Cervical ectropion|Cervical ectropion]]
- [[Pearls/Bacterial vaginosis|Bacterial vaginosis]]
- [[Pearls/Vaginal candidiasis|Vaginal candidiasis]]
- [[Pearls/Trichomoniasis|Trichomoniasis]]
- [[Pearls/Chlamydia|Chlamydia]]
- [[Pearls/Gonorrhoea|Gonorrhoea]]