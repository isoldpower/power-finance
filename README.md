## Motivation
Main motivation for creating this project was to test the Microfrontends concept on a more-or-less big project to find out real downsides of this concept and apply problem-solving skills to solving the potential services integration issues. I also implemented the authentication using third-party service to show my skills in working with external SDKs and APIs (I used [Clerk Authentication](https://clerk.com/docs) for this specific project). Also, this project will be used by myself in the future to test new tools and expand my knowledges without need of writing boilerplate code. The last but not the least is the desire to record the current state of my knowledges to track the progress in the future.

## Project Description
This project is a simple pet-project investigating the potential usecases of Microfrontends concept implementation in Module Federation plugin. The choice of plugin was made based on how wide the support is for different bundlers, and MF was the best at this criteria. 

At the moment of writing the README, the project has:
- 3 main services, namely shell (host application with landing), analytics (service for data-analytics), and finance (service for wallets manipulation). It also utilises the FSD structure within its services to achieve better extendability.
- 3 internal packages set up with Vite, namely build-config (configs for consistent services setup), ui-library (reusable UI components), and shared (package that includes utilities, reusable functions and tools for services integration to host application). Even though it is not neccessary to use the same bundling tool for all packages, for now all of them use Vite.

### Finance Service
This service is a tooling for managing finances, creating cash flows and track expenditures overall. At the moment of writing the README, it doesn't have the backend and save the data in the local storage. All the delays in mocked API requests are fake to show the loading state and immitate the real loading.

### Analytics Service
This service is used for analysing and visualising the cash flows. It uses the `@visx` library under-the-hood to draw graphs.

## Usage Manual
As project is using NX and Lerna under-the-hood, its management can vary with different versions of those tools, making the project's management less straight-forward for users out of project context. This is the root cause behind this section exsistance.

### Installation
0) _(OPTIONAL)_ if you don't have the PNPM installed yet, you will need to install it (_as project is using PNPM workspaces, the package manager choice is strict_)
```bash
npm install -g pnpm
```

1) Install the project using PNPM
```bash
pnpm install --recursive
```
**NOTE:** it will also run the postinstall script for successful project initialisation

2) Build internal packages for consistency. Even thought this step is highly **recommended**, it is **still optional** (as some services can be independent from internal packages)
```bash
npx nx run-many -t build --projects=@internal
```

Now you are ready-to-go. Happy hacking!

### Service-oriented manipulations
This section describes main ways of manipulating services that project provides:

- **Commands-based manipulation**. As in any other project, you can open the `package.json` from the root of the project and by inspecting the 'scripts' field, you will see the list of all actual commands supported. Those commands follow the general pattern: `[command]/[serviceName]` (for example, dev:shell command will run the Vite developemnt server for `shell` service).
```bash
pnpm run dev:shell
```

- **NX-supported management**. This project is using NX bundling tool which means that you can comfortably manipulate its `packages` without consistently jumping between directories.
```bash
npx nx run @power/shell:dev
```

- **PNPM-based management**. Sometimes there is a need to add extra package to specific service without directly navigating to the directory. It can be achieved by using PNPM `--filter` flag. For example, to install the `react` package for `shell` service, you can run:
```bash
pnpm install react --filter=@power/shell
```

- **In-directory management**. This is the most traditional, even thought not the most comfortable one. It includes simple `cd`ing inside the required service directory and manipulating it as a common NPM project.
```bash
cd ./services/shell && pnpm run dev
```

### Global manipulations
The project is using NX meaning it will automatically run coupled commands in the correct sequence. Simply run the NX command and it will work for you:
```bash
nx run @power/shell:build
```

Also, you can find some predefined scripts that handle the most common scenarios in the root `package.json`.

## Known Caveats

This is the list of known issues. It means that they are in the priority list to be fixed:
- [Remote Module loading (issue #4) ](https://github.com/isoldpower/power-finance/issues/4)

## Future Enhancements
- [ ] Analytics
    - [ ] Implement api handlers
    - [ ] Create basic analytics using react-table and visx
    - [ ] Implement filtering using zustand
    - [ ] Cover with tests
    - [ ] Implement CI for the service
- [ ] Shell
    - [ ] Restyle the code according to eslint and Finance service
    - [x] Implement landing page
    - [ ] Cover with tests
    - [x] Integrate with Analytics service
    - [ ] Better FX (Async handling using ErrorBoundary and Suspense)
    - [x] Better UX (Loaders, less twitching)
- [ ] Finance
    - [x] Optimise rerenders
    - [ ] E2E tests
    - [ ] Draft Mode (major feature)
- [ ] UI Toolkit
    - [ ] Utilise Storybook for unified design code
    - [ ] Cover with screenshot tests
    - [ ] Move from default Shadcn/ui design
- [ ] Build Config
	- [ ] Implement automised config file read (without function wrapper)
 	- [ ] Cover with unit tests
