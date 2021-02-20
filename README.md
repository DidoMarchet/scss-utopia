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
 

