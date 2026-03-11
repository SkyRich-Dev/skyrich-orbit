import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import OrbitBuild from "@/pages/services/OrbitBuild";
import OrbitReach from "@/pages/services/OrbitReach";
import OrbitConvert from "@/pages/services/OrbitConvert";
import OrbitAutomate from "@/pages/services/OrbitAutomate";
import OrbitInsights from "@/pages/services/OrbitInsights";
import Industries from "@/pages/Industries";
import Framework from "@/pages/Framework";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlogs from "@/pages/admin/AdminBlogs";
import AdminBlogEditor from "@/pages/admin/AdminBlogEditor";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminNewsletter from "@/pages/admin/AdminNewsletter";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminBehavior from "@/pages/admin/AdminBehavior";
import PageTracker from "@/components/PageTracker";
import CookieConsentBanner, { initConsentOnLoad } from "@/components/CookieConsent";
import { initDataLayer } from "@/lib/dataLayer";

initDataLayer();
initConsentOnLoad();

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/blogs" component={AdminBlogs} />
      <Route path="/admin/blogs/new" component={AdminBlogEditor} />
      <Route path="/admin/blogs/:id/edit" component={AdminBlogEditor} />
      <Route path="/admin/contacts" component={AdminContacts} />
      <Route path="/admin/newsletter" component={AdminNewsletter} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/behavior" component={AdminBehavior} />
      <Route path="/admin/settings" component={AdminSettings} />

      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/about">
        <Layout><About /></Layout>
      </Route>
      <Route path="/services">
        <Layout><Services /></Layout>
      </Route>
      <Route path="/services/orbit-build">
        <Layout><OrbitBuild /></Layout>
      </Route>
      <Route path="/services/orbit-reach">
        <Layout><OrbitReach /></Layout>
      </Route>
      <Route path="/services/orbit-convert">
        <Layout><OrbitConvert /></Layout>
      </Route>
      <Route path="/services/orbit-automate">
        <Layout><OrbitAutomate /></Layout>
      </Route>
      <Route path="/services/orbit-insights">
        <Layout><OrbitInsights /></Layout>
      </Route>
      <Route path="/industries">
        <Layout><Industries /></Layout>
      </Route>
      <Route path="/framework">
        <Layout><Framework /></Layout>
      </Route>
      <Route path="/blog">
        <Layout><Blog /></Layout>
      </Route>
      <Route path="/blog/:slug">
        <Layout><BlogPost /></Layout>
      </Route>
      <Route path="/resources">
        <Layout><Resources /></Layout>
      </Route>
      <Route path="/contact">
        <Layout><Contact /></Layout>
      </Route>

      <Route>
        <Layout><NotFound /></Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <PageTracker />
          <CookieConsentBanner />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
