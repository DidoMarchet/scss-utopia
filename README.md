:book: From [https://en.wiktionary.org/wiki/utopia](https://en.wiktionary.org/wiki/utopia)
> **utopia**
> 
> _A world in which everything and everyone works in perfect harmony._

:waning_crescent_moon: Css (Scss) is not an exact science and manage easily fluid, responsive and static styles in perfect harmony with designer's vision (IMHO) is utopia. 

:waning_gibbous_moon: Is for that purpose [scss-utopia](https://www.npmjs.com/package/scss-utopia) was created: cover **most developer needs**  in terms of typography, spacing and sizes in the simplest and automated possible way!

### Table of content:
- [Breakpoints](#breakpoints)
- [Use Breakpoints](#use-breakpoints)
- [Automate responsive rules](#automate-responsive-rules)
- [Automate fluid rules](#automate-fluid-rules)
- [Automate static rules](#automate-static-rules)
- [Disclaimer](#disclaimer)
- [Awesome](#awesome)
- [Thanks](#thanks)
- [Contribute](#contribute)

You install the package via npm:

``` bash
npm i scss-utopia
```

and include it using an **@import** statement:

``` bash
@import '~scss-utopia';
```

# Breakpoints
First of all we set up the media queries and features **we'll use along all the application**.

The library comes with a list of [default breakpoints and features](https://github.com/DidoMarchet/scss-utopia/blob/main/src/breakpoints.scss):

```
$defaults: (
  "small": (min-width: 320px), 
  "medium": (min-width: 750px),
  "large": (min-width: 1000px),
  "xlarge": (min-width: 1300px),
  "pointer": (pointer: fine) and (hover: hover),
  "touch": (pointer: coarse) and (hover: none)
);
```

Using `$breakpoints` variable in your scss stylesheet you can **easily extend and override**` the defaults values adopting **consistent naming convention**:

```
$breakpoints: (
  "tablet": (min-width: 768px) and (max-width: 1024px),
  "xlarge": (min-width: 1600px),
  "xlarge-retina": (-webkit-min-device-pixel-ratio: 2) and (min-width: 1300px)
  /// [ ...other rules ]
);
```

The result will be the merging of  `$defaults` and `$breakpoints`:

```
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

```
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
At this point we have all instruments to handle the responsive behaviour of our styles.
With [resp mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/resp.scss) we can generate quickly responsive rules.

The mixin take as parameters a list that contains key/values pair.

:warning: `name` is the required for each element and its value is the name of the css property (e.g. font-size, padding, margin...)

Other keys are the values of breakpoint we have declared with the relative value of the css property.

```
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
Now it's time to leave responsive behaviour and **linearly scale rules** between a set of minimum and maximum sizes.

The [fluid mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/fluid.scss) is based on [clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) css function and also provide a fallback for browsers don't support modern css solutions.

It takes as parameters:

- `$property` the name of the fluid property
- `$sizes...` a list of clamp parameters (min, scaler, max) comma separated.

```
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

# Automate static rules
And finally we have the [static mixin](https://github.com/DidoMarchet/scss-utopia/blob/main/src/static.scss) a simple generator of static classes.

It takes as parameters:

- `$class` the name of the class
- `$property` the css property
- `$sizes` a list of static values 
- `$unit` the unit for expressing a length (default `px`)

```
@include static('text', 'font-size' , (1, 1.25, 1.5), 'rem');
@include static('marginTop', 'margin-top' , (25, 50, 75, 100));

/*
  Will generate:

  .text-1 {
    font-size: 1rem;
  }
  .text-1-25 {
    font-size: 1.25rem;
  }
  .text-1-5 {
    font-size: 1.5rem;
  }
  .marginTop-25 {
    margin-top: 25px;
  }
  .marginTop-50 {
    margin-top: 50px;
  }
  .marginTop-75 {
    margin-top: 75px;
  }
  .marginTop-100 {
    margin-top: 100px;
  }
*/
```

:warning: At this point **I was lazy** and I don't care about shorthand property such as `margin: 25px 50px` or `margin: 25px 50px 25px 50px` maybe in the future I'll do 🙏

# Disclaimer
[scss-utopia](https://www.npmjs.com/package/scss-utopia) cover a major part of your needs but with limitations. 

Have a fun with this simple library but remember the challenge will always be there and as mentioned the perfect harmony is **utopia**.

# Awesome
:rocket: Type `npm i scss-utopia` is damned **cool**.
