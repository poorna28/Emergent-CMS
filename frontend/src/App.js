import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { DesignProvider } from "@/design/DesignProvider";

import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import PagesAdmin from "./pages/admin/Pages";
import Media from "./pages/admin/Media";
import Comments from "./pages/admin/Comments";
import Appearance from "./pages/admin/Appearance";
import Plugins from "./pages/admin/Plugins";
import Users from "./pages/admin/Users";
import Tools from "./pages/admin/Tools";
import Settings from "./pages/admin/Settings";
import PageBuilder from "./pages/admin/PageBuilder";
import BlogHome from "./pages/public/BlogHome";
import BlogPost from "./pages/public/BlogPost";
import SitePreview from "./pages/public/SitePreview";

function App() {
  return (
    <div className="App">
      <DesignProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/:id/edit" element={<PostEditor />} />
            <Route path="pages" element={<PagesAdmin />} />
            <Route path="media" element={<Media />} />
            <Route path="comments" element={<Comments />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="appearance/:tab" element={<Appearance />} />
            <Route path="appearance/:tab/*" element={<Appearance />} />
            <Route path="plugins" element={<Plugins />} />
            <Route path="users" element={<Users />} />
            <Route path="tools" element={<Tools />} />
            <Route path="settings" element={<Settings />} />
            <Route path="builder" element={<PageBuilder />} />
          </Route>
          <Route path="/site" element={<BlogHome />} />
          <Route path="/site/preview" element={<SitePreview />} />
          <Route path="/site/:slug" element={<BlogPost />} />
        </Routes>
        <Toaster />
        </BrowserRouter>
      </DesignProvider>
    </div>
  );
}

export default App;
