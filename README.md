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
 In order to perform deploys, you will need to have a Zeit account and be [authenticated](https://zeit.co/docs/now-cli#commands/login) by now-cli  
  
## Explain why each decisions made  
  
- At the architecture level, I follow mainly two power full principles: [KISS](https://en.wikipedia.org/wiki/KISS_principle) and [Rule of Least Power](https://en.wikipedia.org/wiki/Rule_of_least_power). 
- Following KISS, allow us to choose wisely a state Management of our UI. For this case, there is not needed to use any complex state management solutions like `Redux`, `Mobx` or even `Apollo/GraphQL` (despite that GraphQL have [declarative API](https://medium.com/@jero786/graphql-at-high-level-79b842b95b64), you need to create more levels of abstractions like data sources, schemas, resolvers, etc. For that, I prefer to use the imperative approach, like REST, in favor to optimize and follow always simplicity for our use case.
- Deployment and availability: I choose Zeit with serverless because it's really dead simple approach alternative to construct focus and reliable micro/nano services, allowing to focus your services just as lambda functions. Also serverless make your test looks really really simple. And finally, it's really cheaper compared to conventional microservices.
- Material-UI: In order to tackle the essential complexity we use existing libraries. This follows some ideas from the great paper [No Silver Bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet) which say: -"Exploiting the mass market to avoid constructing what can be bought."
- Testing framework: I decide to use react-testing-library in favor to avoid testing details and favor to focus test use cases, for [more details](https://kentcdodds.com/blog/testing-implementation-details).
- Coverage: I follow the principle of looking for the sweet spot of our use case [more detail here](https://medium.com/@jero786/write-test-not-too-many-mostly-integration-bad298f69e1a).
- SSR: For this particular case (Movie Searcher), SSR gives us a really improvement at the traffic level. On the other hand, doing a really fast first load page gives us a really improvement at the UX level as well.
- Typescript: we use static, because it a way to catch errors early. I think, despite of is a super set of JS, Typescript gives us a tool to avoid a bunch of errors and catch early in the life cycle of our development process, such us avoid null-pointer exceptions (the billion dollar mistake) among others. 

## Pending tools to be implemented (out of time)
- CI travis
- Husky/Prettier (with pre-commit). Also codecov & LGTM.
- Add Eslint and others tools to measure and fix code.
- Add More UT API, hooks and React component.
- Adding New Relic to measure and get notified when Errors come up from both, client and service side.
