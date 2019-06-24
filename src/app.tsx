import * as React from 'react';
import cx from 'bem-classnames';
import ReactDom from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Main, Refill } from 'Containers';
import { Header } from 'Components/complex';
import { Routes } from 'Common';

import './app.scss';

const history = createBrowserHistory();

class App extends React.Component<{}, {}> {

    classes = {
        App: { name: 'App' },
        Content: { name: 'App__Content' }
    }

    renderRoutes() {
        return (
            <Switch>
                <Route exact path={Routes.ROOT} component={Main} />
                <Route path={`${Routes.REFILL}/:operatorId`} component={Refill} />
            </Switch>
        );
    }
    
    render() {
        return (
            <Router history={history}>
                <div className={cx(this.classes.App)}>
                    <Header />
                    <div className={cx(this.classes.Content)}>
                        {this.renderRoutes()}
                    </div>
                </div>
            </Router>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));