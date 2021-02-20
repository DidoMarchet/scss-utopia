:book: From [https://en.wiktionary.org/wiki/utopia](https://en.wiktionary.org/wiki/utopia)
> **utopia**
> 
> _A world in which everything and everyone works in perfect harmony._

:waning_crescent_moon: Css (Scss) is not an exact science and manage easily fluid and responsive styles in perfect harmony with designer's vision (IMHO) is utopia. 

:waning_gibbous_moon: Is for that purpose [scss-utopia](https://www.npmjs.com/package/scss-utopia) was created: cover **most developer needs**  in terms of typography, spacing and sizes ([...]) in the simplest and automated possible way!

### Table of content:
- [Breakpoints](#breakpoints)
- [Use Breakpoints](#use-breakpoints)
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

# Breakpoints
First of all we set up the media queries and features **we'll use along all the application**.

The library comes with a list of [default breakpoints and features](https://github.com/DidoMarchet/scss-utopia/blob/main/src/breakpoints.scss):

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

Using `$breakpoints` variable in your scss stylesheet you can **easily extend and override** the defaults values adopting **consistent naming convention**:

``` scss
$breakpoints: (
  "tablet": (min-width: 768px) and (max-width: 1024px),
  "xlarge": (min-width: 1600px),
  "xlarge-retina": (-webkit-min-device-pixel-ratio: 2) and (min-width: 1300px)
  /// [ ...other rules ]
);
```

The resulting set of values will be the merge of `$defaults` and `$breakpoints` variables:

``` scss
/*
  "small": (min-width: 320px), 
  "medium": (min-width: 750px),
  "large": (min-width: 1000px),
  "xlarge": (min-width: 1600px),
  "pointer": (pointer: fine) and (hover: hover),
  "touch": (pointer: coarse) and (hover: none),
  "tablet": (min-width: 768px) and (max-width: 1024px),
  "large-retina": (-webkit-min-device-pixel-ratio: 2)  and (min-width: 1300px)
*/
```

# Use Breakpoints
Once we have declared all breakpoints we need, we can deliver tailored style to each them using the [react mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/react.scss):

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
At this point we have all instruments to handle the style if a certain condition is true.
With [resp mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/resp.scss) we can automate this process and generate quickly responsive rules.

It takes as parameters:

- '$properties...' a list that contains **key/values pair**. 

:warning: Key `name` is the name of css rule and it's required for each element.

Other key/values pair has a breakpoints as key and a size as value.

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

The [fluid mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/fluid.scss) use [clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) css function and also provide a fallback for browsers that [don't support](https://caniuse.com/?search=clamp()) modern css solutions.

It takes as parameters:

- `$property` the name of the css rule;
- `$sizes...` a list of clamp parameters `(min scaler max, min scaler max, [...])`.

``` scss
p{
  @include fluid('font-size', 1rem 5vw 3rem);
  @include fluid('margin', 100px 10vw 200px, 150px 25vw 300px);
  @include fluid('padding', 100px 10vw 200px, 150px 25vw 300px, 100px 10vw 200px, 150px 25vw 300px);
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
    padding: 200px 300px 200px 300px;
    padding: min(max(100px, 10vw), 200px) min(max(150px, 25vw), 300px) min(max(100px, 10vw), 200px) min(max(150px, 25vw), 300px);
    padding: clamp(100px, 10vw, 200px) clamp(150px, 25vw, 300px) clamp(100px, 10vw, 200px) clamp(150px, 25vw, 300px);
  }
*/
```

# Disclaimer
[scss-utopia](https://www.npmjs.com/package/scss-utopia) covers a major part of your needs in terms of sizing, positioning and in general aspect.

However the mixins are not ideal to handle rules concerning layout (`grid` properties in particular). 

As mentioned the perfect harmony is **utopia**.

# Awesome
:rocket: Type `npm i scss-utopia` is damned **cool**.

# Thanks
Special thanks for the inspiration and snippets to:

- [hugogiraudel.com/](https://hugogiraudel.com/) who let me to use his scss snippets
- [eduardoboucas/include-media](https://github.com/eduardoboucas/include-media) the wonderful library who inspire me to create the structure of the [breakpoints](#breakpoints) and the [react mixin](#use-breakpoints)
- [www.bronco.co.uk/our-ideas/creating-a-clamp-fallback-function-in-sass-scss/](https://www.bronco.co.uk/our-ideas/creating-a-clamp-fallback-function-in-sass-scss/) who inspire me to create the [fluid mixin](#automate-fluid-rules)

# Contribute
Feel free to **fork and increase** this repo!

And **let me know** if you find it useful!

Enjoy :punch:
