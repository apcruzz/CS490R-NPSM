# Learning Plan: React Frontend for National Parks Social

## Technology I Am Learning

I am learning how to build a frontend using React, TypeScript, and Vite.

This frontend will eventually connect to the REST API I am building for the course. The API will require authentication, so the frontend needs to support logging in, storing an authentication token, and making authenticated API requests.

## What I Already Know

I already have a basic React/Vite project set up for a national parks social media website. The app currently displays a national parks map and uses React components. I understand the general idea of components, props, and running the project with npm scripts, but I still need more practice with frontend state management, forms, API requests, authentication flows, and connecting the frontend to my backend REST API.

## What I Am Building Toward

By the end of week 5, I want to have a working frontend for the National Parks Social website that connects to my REST API.

The frontend should allow users to:

- View national parks content
- Register or log in
- Store authentication state after logging in
- Make authenticated requests to the REST API
- Create, view, update, or delete social content depending on what the API supports
- Handle loading states, errors, and logged-out states clearly

## Time Available

I have about 5 to 7 hours per week available to work on this frontend.

## Week 2: React Fundamentals and Project Structure

### Weekly Goal

Learn how to build forms, manage user input, and create multiple frontend views for the national parks social media app.

### Recommended Resources

- React official documentation: https://react.dev/learn
- Vite React guide: https://vite.dev/guide/
- TypeScript with React documentation: https://react.dev/learn/typescript
- MDN JavaScript modules guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### What To Work On

- Review the current project structure.
- Identify major UI sections such as map, navigation, park details, auth pages, and social feed.
- Practice creating reusable React components.
- Practice passing data through props.
- Use React state for simple UI interactions.
- Create placeholder pages or components for Login, Register, Feed, and Profile.

### Milestones

- I can explain what each main file in the frontend does.
- I can create a new React component and import it into the app.
- I can use props to pass national park data into a component.
- I have placeholder components for the main pages the app will eventually need.

## Week 3: Forms, Routing, and Frontend State

### Weekly Goal

Strengthen my understanding of React components, props, state, and project structure so I can confidently organize the National Parks Social frontend.

### Recommended Resources

- React forms documentation: https://react.dev/reference/react-dom/components/input
- React Router documentation: https://reactrouter.com/start/declarative/installation
- MDN Fetch API guide: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- Web.dev article on forms: https://web.dev/learn/forms

### What To Work On

- Add routing if the project does not have it yet.
- Create routes for Home, Login, Register, Parks, Feed, and Profile.
- Build login and register forms.
- Practice controlled inputs with React state.
- Add basic form validation.
- Create a shared API helper file for future REST API requests.
- Add frontend state for current user, loading, and errors.

### Milestones

- I can move between pages without reloading the browser.
- The Login and Register pages have working form inputs.
- Form values are stored in React state.
- Invalid forms show useful error messages.
- The project has a clear place for API request functions.

## Week 4: REST API Integration and Authentication

### Weekly Goal

Connect the frontend to the REST API, support user login, and make authenticated requests using the returned authentication token.

### Recommended Resources

- MDN Fetch API guide: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- React documentation on effects: https://react.dev/learn/synchronizing-with-effects
- OWASP authentication cheat sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- Auth token storage discussion from Auth0: https://auth0.com/docs/secure/security-guidance/data-security/token-storage

### What To Work On

- Connect the Login form to the API login endpoint.
- Connect the Register form to the API registration endpoint if available.
- Store the authentication token after a successful login.
- Add logout functionality.
- Send authenticated requests using the token.
- Fetch protected user data from the API.
- Show different UI for logged-in and logged-out users.
- Add loading and error states for API requests.

### Milestones

- I can log in using the frontend and receive a token from the API.
- The app remembers that I am logged in after a successful login.
- Authenticated API requests include the correct authorization header.
- The app handles failed login attempts.
- The app has a working logout button.

## Week 5: National Parks Social Features and Polish

### Weekly Goal

Finish the main frontend workflow so the National Parks Social app can connect to the authenticated REST API and support the core user experience.

### Recommended Resources

- React documentation on sharing state: https://react.dev/learn/sharing-state-between-components
- React documentation on conditional rendering: https://react.dev/learn/conditional-rendering
- MDN HTTP response status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- Web.dev accessibility basics: https://web.dev/learn/accessibility

### What To Work On

- Connect the park feed or social content views to the API.
- Display posts, comments, saved parks, or user-specific content depending on the backend features.
- Add create, update, and delete actions where supported by the API.
- Protect pages that require login.
- Improve error messages and empty states.
- Test the app manually from login through authenticated API actions.
- Clean up styling and make the main user flow easy to follow.

### Milestones

- The frontend connects successfully to the REST API.
- A user can log in and access protected frontend features.
- The frontend can make authenticated API requests.
- At least one main social feature works end to end with the API.
- The app clearly handles loading, success, error, and logged-out states.
- By the end of week 5, I have a working frontend connected to my authenticated REST API.

## Final Success Criteria

By the end of this learning plan, I should have a React/Vite frontend for the National Parks Social website that connects to my REST API and supports authentication. I should be able to demonstrate logging in, making authenticated requests, and using at least one complete feature that depends on the backend API.
