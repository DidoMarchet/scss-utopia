# scss-utopia: save time, build fast (almost everything)

**:bangbang: Use these distinct modules for clamp - [scss-slamp](https://github.com/DidoMarchet/scss-slamp) - and media queries - [scss-react](https://github.com/DidoMarchet/scss-slamp) - :bangbang:**

:book: From [https://en.wiktionary.org/wiki/utopia](https://en.wiktionary.org/wiki/utopia)
> **utopia**
> 
> _A world in which everything and everyone works in perfect harmony._

:waning_crescent_moon: Css is not an exact science and managing easily fluid and responsive styles in perfect harmony with designer's vision (IMHO) is utopia. 

:waning_gibbous_moon: For that purpose [scss-utopia](https://www.npmjs.com/package/scss-utopia) was created: covering **most developer needs**  in terms of typography, spacing and sizes ([...]) in the simplest and automated possible way!

### Table of content:
- [Queries](#queries)
- [Use Queries](#use-queries)
- [Automate responsive rules](#automate-responsive-rules)
- [Automate fluid rules](#automate-fluid-rules)
- [Disclaimer](#disclaimer)
- [Awesome](#awesome)
- [Thanks](#thanks)
- [Contribute](#contribute)

You install the package via npm:

``` bash
npm i scss-utopia
```

and include it using an **@import** statement:

``` scss
@import '~scss-utopia';

/// @import 'node_modules/scss-utopia/dist/index.scss';
/// [...]
```

# Queries
First of all we set up the media queries and features **we'll use along all the application**.

The library comes with a list of [default queries and features](https://github.com/DidoMarchet/scss-utopia/blob/main/src/queries.scss):

``` scss
$defaults: (
  "small": (min-width: 320px), 
  "medium": (min-width: 750px),
  "large": (min-width: 1000px),
  "xlarge": (min-width: 1300px),
  "pointer": (pointer: fine) and (hover: hover),
  "touch": (pointer: coarse) and (hover: none)
);
```

Using `$queries` variable in your scss stylesheet you can **easily extend and override** the default values adopting **consistent naming convention**:

``` scss
$queries: (
  "tablet": (min-width: 768px) and (max-width: 1024px),
  "xlarge": (min-width: 1600px),
  "xlarge-retina": (-webkit-min-device-pixel-ratio: 2) and (min-width: 1300px)
  /// [ ...other rules ]
);
```

The resulting set of values will be the merge of `$defaults` and `$queries` variables:

``` scss
/*
  "small": (min-width: 320px), 
  "medium": (min-width: 750px),
  "large": (min-width: 1000px),
  "xlarge": (min-width: 1600px), // overrited 
  "pointer": (pointer: fine) and (hover: hover),
  "touch": (pointer: coarse) and (hover: none),
  "tablet": (min-width: 768px) and (max-width: 1024px), // added
  "large-retina": (-webkit-min-device-pixel-ratio: 2)  and (min-width: 1300px) // added
*/
```

# Use Queries
Once we have declared all the queries we need, we can deliver tailored style to each them using the [react mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/react.scss):

``` scss
@include react('medium'){
  body{
    background: black;
  }
}
a{
  @include react('pointer'){
    &:hover{
      color: red;
    }
  }
}

/*
  Will generate 

  @media (min-width: 750px)
    body {
      background: black;
    }
  }
  @media (hover: hover)
    a:hover {
      color: red;
    }
  }
*/
```

:cold_sweat: **Self guard:** *the mixin is called react because it has a reaction when a rule comes true, nothing in common with the js framework* 

# Automate responsive rules
At this point we have all the instruments to handle the style if a certain condition is true.
With [resp mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/resp.scss) we can automate this process and quickly generate responsive rules.

The mixin:

``` scss
@mixin resp($properties...){ /* code */ }
```

takes as parameters:

- `$properties...` a list that contains **key/values pair**. 

:warning: Key `name` is the name of css rule and it's required for each element.

Other key/values pair have a query as key and a size as value.

``` scss
p{
  font-size: 1rem;
  @include resp(
    (
      'name': 'font-size',
      'medium': 1.15rem,
      'large': 1.35rem,
      'xlarge': 1.5rem
    ),
    (
      'name': 'margin',
      'medium': 25px 50px,
      'xlarge': 50px 100px
    )
  );
}

/* 
  Will generate:
  
  p {
    font-size: 1rem;
  }
  @media (min-width: 750px) {
    p {
      font-size: 1.15rem;
      margin: 25px 50px;
    }
  }
  @media (min-width: 1000px) {
    p {
      font-size: 1.35rem;
    }
  }
  @media (min-width: 1300px) {
    p {
      font-size: 1.5rem;
      margin: 50px 100px;
    }
  }
*/
```

# Automate fluid rules
Now it's time to leave responsive behaviour and **linearly scale rules** between an upper and lower bound. 

The [fluid mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/fluid.scss) uses [clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) css function and also provides a fallback for browsers that [don't support](https://caniuse.com/?search=clamp()) modern css solutions.

The mixin:

``` scss
@mixin fluid($property, $sizes...) { /* code */ }
```

takes as parameters:

- `$property` the name of the css rule;
- `$sizes...` a list of clamp parameters `(min scaler max, min scaler max, [...])`.

``` scss
p{
  @include fluid('font-size', 1rem 5vw 3rem);
  @include fluid('margin', 100px 10vw 200px, 150px 25vw 300px);
  @include fluid('padding', 100px 10vw 200px, 20px, 100px 10vw 200px);
}

/*
  Will generate:

  p {
    font-size: 3rem;
    font-size: min(max(1rem, 5vw), 3rem);
    font-size: clamp(1rem, 5vw, 3rem);
    margin: 200px 300px;
    margin: min(max(100px, 10vw), 200px) min(max(150px, 25vw), 300px);
    margin: clamp(100px, 10vw, 200px) clamp(150px, 25vw, 300px);
    padding: 200px 20px 200px;
    padding: min(max(100px, 10vw), 200px) 20px min(max(100px, 10vw), 200px);
    padding: clamp(100px, 10vw, 200px) 20px clamp(100px, 10vw, 200px);
  }
*/
```
:tractor: **Boosted allowing the use of fluid and static values together:**

``` scss
p{
  // rules: static static
  @include fluid('padding', 20px, 20px);
  // rules: fluid static
  @include fluid('padding', 100px 10vw 200px, 20px);
  // rules: fluid static fluid
  @include fluid('padding', 100px 10vw 200px, 20px, 100px 10vw 200px);
  // rules: static fluid static
  @include fluid('padding', 20px, 100px 10vw 200px, 20px);
  /// [ ...other rules ]
}

/*
  Will generate:
  
  p {
    // rules: static static
    padding: 20px 20px;
    padding: 20px 20px;
    padding: 20px 20px;
    
    // rules: fluid static
    padding: 200px 20px;
    padding: min(max(100px, 10vw), 200px) 20px;
    padding: clamp(100px, 10vw, 200px) 20px;
    
    // rules: fluid static fluid
    padding: 200px 20px 200px;
    padding: min(max(100px, 10vw), 200px) 20px min(max(100px, 10vw), 200px);
    padding: clamp(100px, 10vw, 200px) 20px clamp(100px, 10vw, 200px);
    
    // rules: static fluid static
    padding: 20px 200px 20px;
    padding: 20px min(max(100px, 10vw), 200px) 20px;
    padding: 20px clamp(100px, 10vw, 200px) 20px;
  }
*/
```

# Disclaimer
[scss-utopia](https://www.npmjs.com/package/scss-utopia) covers **the majority of your needs** in terms of sizing, positioning and in general aspect.

However the mixins are **not ideal** to handle rules **concerning layout** (`grid` properties in particular) or **adaptive design**. 

As mentioned the perfect harmony is **utopia**.

# Awesome
:rocket: Type `npm i scss-utopia` is damned **cool**.

:hourglass_flowing_sand: It **saves time**.

# Thanks
Special thanks for the inspiration and snippets to:

- [hugogiraudel.com/](https://hugogiraudel.com/) who let me to use **his scss snippets** useful for [react mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/react.scss) [and manage array](https://github.com/DidoMarchet/scss-utopia/blob/main/src/utils.scss)
- [eduardoboucas/include-media](https://github.com/eduardoboucas/include-media/) the **wonderful library** who inspire me to create the structure of the [queries](#queries) and the [react mixin](#use-queries)
- [www.bronco.co.uk/our-ideas/creating-a-clamp-fallback-function-in-sass-scss/](https://www.bronco.co.uk/our-ideas/creating-a-clamp-fallback-function-in-sass-scss/) who **lay the foundation** to create the [fluid mixin](#automate-fluid-rules)

# Contribute
Feel free to **fork and increase** this repo!

And **let me know** if you find it useful!

Enjoy :punch:
