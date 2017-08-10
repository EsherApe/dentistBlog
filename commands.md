### Commands for heroku command-line

```bash
$ heroku login
$ git clone ...[my app]
$ heroku create [name]      #- (Create an app on Heroku)
$ git push heroku master    #- (deploy code)
$ heroku ps:scale web=1     #- (scale the number of dynos)
$ heroku open               #- (open in browser)
$ heroku logs --tail        #- (logger)
$ heroku local web          #- (run the app locally)
```

#### Deploy
```bash
$ git add .
$ git commit -m " "
$ git push heroku master
```

#### Addons
```bash
$ heroku addons:create papertrail
$ heroku addons
$ heroku addons:open papertrail
```

#### Console
```bash
$ heroku run node
$ heroku run bash
```

#### Define config vars
```bash

```