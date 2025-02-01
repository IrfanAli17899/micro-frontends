import('./bootstrap')
.then(({ bootstrap }) => bootstrap(document.body))
.catch((err) => console.error(err));