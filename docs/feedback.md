---
layout: page
---
# User Feedback

Feedback about the Portal comes through multiple channels, including:
- the [contact form](https://hubmapconsortium.org/contact-us/), linked in the HuBMAP Data Portal footer
- the [HuBMAP Helpdesk](mailto:help@hubmapconsortium.org), visitors can submit feedback or report issues
- [GitHub](https://github.com/hubmapconsortium/portal-ui/issues/new/choose), HuBMAP GitHub users can submit issues directly
- periodic user surveys

## Process

- Feedback is first processed by the IEC, and user account and Globus issues are handled there.
- If the problem concerns the Portal an issue is then filed in GitHub with the
  [`triage`](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aopen+is%3Aissue+label%3Atriage) tag.
- A Portal developer reviews it, and may
    - split it up into more fine-grained issues
    - note existing issues that cover the same ground
    - add notes to the issue clarifying the work to be done
    - or move it to a diffent repo, for instance [`portal-docs`](https://github.com/hubmapconsortium/portal-docs/issues)
- At this point either the `triage` tag is removed, and it is treated like any other internal issue,
  or it is [closed](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aissue+label%3Atriage+is%3Aclosed).
- Current work items are tracked with
  [milestones](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aissue+milestone%3A%2A+is%3Aopen).
- Tags are used to identify issues that are not moving forward. Possible reasons include:
    - [`on-hold`](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aopen+is%3Aissue+label%3Aon-hold):
      waiting to see if more people complain
    - [`blocked`](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aopen+is%3Aissue+label%3Ablocked):
      prerequisites or appropriate process not in place
    - [`wontfix`](https://github.com/hubmapconsortium/portal-ui/issues?q=is%3Aopen+is%3Aissue+label%3Awontfix):
      not feasible, or just not a good idea
