# Architecture

The application follows an MVC-inspired, layered structure adapted to React.

## Layers

- `src/domain`: framework-independent model, types, invariants, and pure
  business functions.
- `src/config`: the single source of truth for wedding content, dates, links,
  theme tokens, SEO, and RSVP options.
- `src/application`: controllers, use-case mapping, hooks, and repository ports.
- `src/infrastructure`: adapters for browser or remote services. The current
  RSVP adapter stores a draft on the visitor's device.
- `src/presentation`: views, reusable components, and theme mapping.
- `app`: framework composition root, metadata, and global style entry points.
- `app/styles`: presentation styles split by page responsibility.

## MVC mapping

| MVC responsibility | Project location |
| --- | --- |
| Model | `src/domain` and `src/config` |
| Controller | `src/application/controllers` |
| View | `src/presentation/views` and `src/presentation/components` |

## Configuration

Most wedding-specific changes belong in:

`src/config/wedding.config.ts`

Changing the theme there updates CSS custom properties without coupling the
domain model to presentation code.

## Replacing RSVP storage

Implement the `RsvpRepository` port and inject the new adapter in
`WeddingInvitationApp`. The controller and views do not need to change.
