# A Simple SSR React APP 

Demo Live: https://react-movies.jero786.now.sh/

## Pre-requisites    
- node: 10.16.x    
- npm: 6.9.x    
- ts-node: v8.6.2    
- now: 17.0.4    
    
## Setup project    
```
yarn
``` 
## Start locally:
```
yarn dev
``` 
That will start app on: `http://localhost:3000`    
 
## Run test:
```
 yarn test
```  
## Deploy to staging    
```  
 now
```   
In order to perform deploys, you will need a Zeit account and also be [authenticated](https://zeit.co/docs/now-cli#commands/login) by now-cli. 
  
## Explanation about why each decision made
  
- At the architecture level, I follow mainly two powerful principles: [KISS](https://en.wikipedia.org/wiki/KISS_principle) and [Rule of Least Power](https://en.wikipedia.org/wiki/Rule_of_least_power). 
- Following KISS, allow us to choose for example wisely a state Management of our UI. For this case, there is not needed to use any complex state management solutions like `Redux`, `Mobx`, `Apollo/GraphQL` (despite that GraphQL have [declarative API](https://medium.com/@jero786/graphql-at-high-level-79b842b95b64) or even `useReducer`. You need to create more levels of abstractions like data sources, schemas, resolvers, etc. For that, I prefer to use the imperative approach, like REST, in favor to optimize and follow always simplicity for our use case.
- Deployment and availability: I choose Zeit with serverless because it's really dead simple approach alternative to construct focus and reliable micro/nano services, allowing to focus your services just as lambda functions. Also serverless make your test looks really really simple. And finally, it's really cheaper compared to conventional microservices.
- Material-UI: In order to tackle the essential complexity we use existing libraries. This follows some ideas from the great paper [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet) which say: -"Exploiting the mass market to avoid constructing what can be bought."
- Testing framework: I decide to use react-testing-library in favor to avoid testing details and favor to focus test use cases, for [more details](https://kentcdodds.com/blog/testing-implementation-details).
- Coverage: I follow the principle of looking for the sweet spot of our use case [more detail here](https://medium.com/@jero786/write-test-not-too-many-mostly-integration-bad298f69e1a).
- SSR: For this particular case (Movie Searcher), SSR gives us a really improvement at the traffic level. On the other hand, doing a really fast first load page gives us a really improvement at the UX level as well.
- Typescript: As a superset of JS, it gives us the best of both worlds (Strong/Inferred Types vs dynamic types). Allow us to catch early our bugs in the life cycle of the development process. And also help general commons problems, like null-pointer exceptions (the billion-dollar mistake). And finally, you can define how much strict types validation do you want or need to be.
- Standardx: JavaScript Standard Style with custom tweeks, allow us to follow industry standards with zero configuration, again, be focus in the important for our use case.
- Zeit/Now: A cloud hosting service with zero configuration by default, following the same principle idea already explained.

## Pending tools to be implemented (out of time)
- Add CI Travis.
- Add Husky & Prettier (with pre-commit). 
- Add codecov & LGTM.
- Add More UT API, hooks and React component.
- Add New Relic to measure and get notified when Errors come up from both (client and server side).
