# Hello 👋

This is an example React app - showing how easy it can be to get started.

<br />

## Goals

1. Keep it simple, stupid. If you over-engineer your app, then you actually will feel stupid.
2. Seriously, keep it simple. Minimize dependencies.

- Do you need that CSS framework? Maybe. But first try to use the simpler smaller "css modules" approach.
- Do you need to import a debounce function from a 3rd party library? No. It's just a few lines of code.

3. So, this app tries to be very easy to maintain by making everything **modular**:

<br />

# Atomic

## **`ui`** folder

Is used as a local "UI Library", specific to the needs/branding of this app. If any of these become generic, able to be used for multiple apps, they can be separated out to their own external library. But that adds a lot of maintenance/testing/versioning, so best to keep it local.

Inspired by "Atomic Design" principles. UI components should behave like "atoms"/"molecules" (not "organisms"/"templates"). Group each set of components into a folder, so the `ui` folder does not grow into a huge long list. Inside each folder, the `index.tsx` file should serve as the "molecule", import multiple smaller "atom" components from the folder. Each "atom" component should be able to be imported and used individually also. Atoms should not rely on anything.

Local UI components should support these values:

<br />

#### Pure functions

Used as "pure functions". Do not interact with state or actions outside themselves.
Let's not get into mocking/spying hell when unit testing. Each component should be a simple input/output.
Logic, data fetching, and reference to the runtime environment should be kept in the parent.

<br />

#### Composable

Accept all valid HTML attributes passed to them from the parent. Like this:

```
export default function Header(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} data-component="Header">
      ...
    </div>
  )
}
```

<br />

#### Customizable, but Concise

Pass options/flags as props to modify some internal functionality of the component.
But if an option changes a lot of the functionality, makes it more difficult to maintain, then it's better to create a new component for the new functionality.

<br />
