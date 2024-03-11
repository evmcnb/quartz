import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Nosos: "https://www.nosos.co.uk",
      Tags: "https://notes.nosos.co.uk/tags",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.PageTitle(),
    Component.Darkmode(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.RecentNotes()),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// export const homePageContentLayout: PageLayout = {
//   beforeBody: [
//     // Component.Breadcrumbs(),
//     Component.ArticleTitle(),
//     Component.ContentMeta(),
//     Component.TagList(),
//     Component.MobileOnly(Component.TableOfContents()),
//   ],
//   left: [
//     Component.PageTitle(),
//     Component.Darkmode(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Search(),
//     Component.DesktopOnly(Component.RecentNotes()),
//     Component.DesktopOnly(Component.Explorer()),
//   ],
//   right: [
//     Component.Graph(),
//     Component.DesktopOnly(Component.TableOfContents()),
//     Component.Backlinks(),
//   ],
// }

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
