import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch, RouteProps // eslint-disable-line
} from 'react-router-dom';
import Authentication from './containers/Authentication/Authentication';
import MainDashboard from './containers/MainDashboard/MainDashboard';
import RoadmapDashboard from './containers/RoadmapDashboard/RoadmapDashboard';
import Discover from './containers/Discover/Discover';
import RoadmapPreview from './containers/RoadmapPreview/RoadmapPreview';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Authentication} />
      <Route path="/preview/:id" component={RoadmapPreview} />
      <ProtectedRoute
        authenticationPath="/login"
        path="/dashboard"
        component={MainDashboard}
      />
      <ProtectedRoute authenticationPath="/login" path="/roadmap/:id" component={RoadmapDashboard} />
      <ProtectedRoute authenticationPath="/login" path="/discover" component={Discover} />
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  </Router>
);

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

// TODO: abstract into another module
export class ProtectedRoute extends Route<ProtectedRouteProps> {
  public render() {
    let redirectPath: string = '';
    if (!(localStorage.getItem('token'))) {
      redirectPath = this.props.authenticationPath;
    }
    if (redirectPath) {
      const renderComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
      return (
        <Route
          {...this.props} // eslint-disable-line
          component={renderComponent}
          render={undefined}
        />
      );
    }
    return <Route path={this.props.path} component={this.props.component} />; // eslint-disable-line
  }
}

export default App;
