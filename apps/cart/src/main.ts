import('./bootstrap').then(({ bootstrap }) => {
  bootstrap();
}).catch(err => console.error(err));