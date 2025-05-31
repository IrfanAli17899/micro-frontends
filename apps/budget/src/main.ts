import('./bootstrap').then(({ bootstrap }) => {
    bootstrap('#root');
}).catch((err) => console.error(err));
