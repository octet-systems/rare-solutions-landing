import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, BookOpen, Plus, ChevronRight, Eye, 
  ThumbsUp, Tag, Calendar, User, Edit2, Trash2, ExternalLink
} from "lucide-react";
import type { KnowledgeBaseArticle, KBArticleDetail } from "@/types/support";

interface KnowledgeBaseFullProps {
  articles: KnowledgeBaseArticle[];
  onSelectArticle: (article: KnowledgeBaseArticle) => void;
  onClose?: () => void;
}

export const KnowledgeBaseFull = ({ articles, onSelectArticle, onClose }: KnowledgeBaseFullProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewArticleDialog, setShowNewArticleDialog] = useState(false);

  const categories = ["all", ...new Set(articles.map(a => a.category))];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                         a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                         a.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl">Knowledge Base</h2>
            <p className="text-sm text-muted-foreground">Self-service help articles</p>
          </div>
          <Button size="sm" onClick={() => setShowNewArticleDialog(true)}>
            <Plus size={14} className="mr-1" /> New Article
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map(article => (
            <Card key={article.id} className="hover:border-accent/50 transition-colors cursor-pointer group" onClick={() => onSelectArticle(article)}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">{article.category}</Badge>
                  <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-base leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye size={12} /> {article.views}</span>
                  <span className="flex items-center gap-1"><ThumbsUp size={12} /> {article.helpful}</span>
                  {article.tags && article.tags.length > 0 && (
                    <span className="flex items-center gap-1"><Tag size={12} /> {article.tags[0]}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto mb-3 text-muted-foreground opacity-30" />
            <p className="text-muted-foreground">No articles found</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowNewArticleDialog(true)}>
              Create New Article
            </Button>
          </div>
        )}

        <Dialog open={showNewArticleDialog} onOpenChange={setShowNewArticleDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input placeholder="Article title" />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Networking">Networking</SelectItem>
                    <SelectItem value="Telephony">Telephony</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Tags (comma separated)</Label>
                <Input placeholder="cisco, vlan, network" />
              </div>
              <div className="grid gap-2">
                <Label>Excerpt</Label>
                <Textarea placeholder="Brief description..." rows={2} />
              </div>
              <div className="grid gap-2">
                <Label>Content (Markdown supported)</Label>
                <Textarea placeholder="Full article content..." rows={10} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewArticleDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowNewArticleDialog(false)}>Publish Article</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface KBArticleDetailViewProps {
  article: KnowledgeBaseArticle | KBArticleDetail;
  onBack: () => void;
}

export const KBArticleDetailView = ({ article, onBack }: KBArticleDetailViewProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-4 gap-1" onClick={onBack}>
          <ChevronRight size={16} className="rotate-180" /> Back to Knowledge Base
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge variant="outline" className="mb-2">{article.category}</Badge>
            <h1 className="font-heading font-semibold text-2xl">{article.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {article.updatedAt}</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {article.views} views</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => setShowEditDialog(true)}>
              <Edit2 size={14} className="mr-1" /> Edit
            </Button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none mb-8">
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="mt-6 p-4 rounded-lg bg-muted/50">
            <p>This is the main content of the article. In a real implementation, this would render Markdown or HTML content.</p>
            <ol className="list-decimal ml-4 mt-2 space-y-1">
              <li>Step one - do this first</li>
              <li>Step two - then do this</li>
              <li>Step three - finally complete this</li>
            </ol>
          </div>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <Tag size={14} className="text-muted-foreground" />
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}

        <div className="border-t pt-6">
          <h3 className="font-medium mb-3">Was this article helpful?</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ThumbsUp size={14} /> Yes ({article.helpful})
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <ThumbsUp size={14} className="rotate-180" /> No
            </Button>
          </div>
        </div>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Article</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input defaultValue={article.title} />
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea rows={12} defaultValue={article.content || ""} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowEditDialog(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
