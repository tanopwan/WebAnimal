
import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router'

import routes from './routes.jsx';

export default function(req, res) {
    console.log('[router.js] routes:' + req.url);

    match({ routes, location:req.url }, (error, redirectLocation, renderProps) => {
    	if (error) {
      		res.status(500).send(error.message)
    	} else if (redirectLocation) {
      		res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    	} else if (renderProps) {
      		res.render("index.handlebars", {
            	markup: ReactDOM.renderToString(<RouterContext {...renderProps} />)
        	});
    	} else {
      		res.status(404).send({message: '[router.jsx] Not found'});
    	}
    });
}
