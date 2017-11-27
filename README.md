# Mr Meeseeks

## Instalação

![Mr. Meeseeks](img/mr-meeseeks.jpg?raw=true "I'm Mr. Meeseeks. Look at me!")

Para instalar execute:

```bash
$ npm install https://github.com/joeldatabox/mr-meeseeks.git --save
```

e adicione no seu `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SrMeeseeksModule } from 'mr-meeseeks';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // I'm Mr. Meeseeks. Look at me :)
    SrMeeseeksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## License

MIT © [Joel Rodrigues Moreira](mailto:joel.databox@gmail.com)
