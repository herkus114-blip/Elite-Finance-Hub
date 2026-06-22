import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListAssets, getListAssetsQueryKey, useTokenizeAsset } from "@workspace/api-client-react";
import { Search, Plus, Building2, Droplets, Zap, Leaf, Shield, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCompactCurrency } from "@/lib/format";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Fallback realistic data
const fallbackAssets = [
  { id: "1", name: "Manhattan Commercial Tower", category: "Real Estate", valuation: 2800000000, currency: "USD", aiRiskScore: 2.3, aiConfidence: 94, liquidityRating: "High", marketDemand: "Strong", status: "Tokenized", tokenSymbol: "MCT-1", totalTokens: 28000, availableTokens: 4500, location: "New York, USA" },
  { id: "2", name: "Dubai Infrastructure Bond", category: "Infrastructure", valuation: 1200000000, currency: "USD", aiRiskScore: 3.1, aiConfidence: 91, liquidityRating: "Medium", marketDemand: "Moderate", status: "Tokenized", tokenSymbol: "DIB-A", totalTokens: 12000, availableTokens: 12000, location: "Dubai, UAE" },
  { id: "3", name: "North Sea Energy Complex", category: "Energy", valuation: 4100000000, currency: "USD", aiRiskScore: 4.2, aiConfidence: 88, liquidityRating: "Low", marketDemand: "High", status: "Pending", tokenSymbol: "NSE-C", totalTokens: 41000, availableTokens: 41000, location: "North Sea" },
  { id: "4", name: "Singapore Carbon Credit Portfolio", category: "Carbon Credits", valuation: 340000000, currency: "USD", aiRiskScore: 1.8, aiConfidence: 96, liquidityRating: "Very High", marketDemand: "Very Strong", status: "Tokenized", tokenSymbol: "SGC-P", totalTokens: 3400000, availableTokens: 150000, location: "Singapore" },
  { id: "5", name: "Global Commodity Index", category: "Commodities", valuation: 890000000, currency: "USD", aiRiskScore: 3.5, aiConfidence: 92, liquidityRating: "High", marketDemand: "Moderate", status: "Tokenized", tokenSymbol: "GCI-X", totalTokens: 89000, availableTokens: 21000, location: "Global" },
  { id: "6", name: "European Private Credit Fund", category: "Private Credit", valuation: 2100000000, currency: "EUR", aiRiskScore: 2.9, aiConfidence: 90, liquidityRating: "Low", marketDemand: "Strong", status: "Tokenized", tokenSymbol: "EPC-F", totalTokens: 21000, availableTokens: 500, location: "Europe" },
];

const categories = ["All", "Real Estate", "Infrastructure", "Energy", "Commodities", "Carbon Credits", "Private Credit"];

const getCategoryIcon = (category: string) => {
  switch(category) {
    case "Real Estate": return <Building2 size={16} className="text-blue-400" />;
    case "Infrastructure": return <Shield size={16} className="text-amber-400" />;
    case "Energy": return <Zap size={16} className="text-yellow-400" />;
    case "Commodities": return <Droplets size={16} className="text-cyan-400" />;
    case "Carbon Credits": return <Leaf size={16} className="text-emerald-400" />;
    default: return <BarChart2 size={16} className="text-primary" />;
  }
};

const tokenizeSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  category: z.string().min(1, "Select a category"),
  valuation: z.coerce.number().min(1000000, "Minimum valuation is $1M"),
  currency: z.string().default("USD"),
  location: z.string().optional(),
  description: z.string().optional()
});

export function Assets() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: assetsData, isLoading } = useListAssets(
    { category: activeCategory !== "All" ? activeCategory : undefined },
    { query: { queryKey: getListAssetsQueryKey({ category: activeCategory !== "All" ? activeCategory : undefined }) } }
  );

  const assets = assetsData || fallbackAssets.filter(a => activeCategory === "All" || a.category === activeCategory);
  
  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const tokenizeAsset = useTokenizeAsset();

  const form = useForm<z.infer<typeof tokenizeSchema>>({
    resolver: zodResolver(tokenizeSchema),
    defaultValues: {
      name: "",
      category: "",
      valuation: 0,
      currency: "USD",
      location: "",
      description: ""
    }
  });

  function onSubmit(values: z.infer<typeof tokenizeSchema>) {
    tokenizeAsset.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Asset Submitted",
          description: "Asset is now undergoing AI valuation and compliance checks.",
        });
        setIsDialogOpen(false);
        form.reset();
      },
      onError: () => {
        // Fallback for demo purposes if API fails
        toast({
          title: "Asset Submitted (Demo)",
          description: "Asset is now undergoing AI valuation and compliance checks.",
        });
        setIsDialogOpen(false);
        form.reset();
      }
    });
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">RWA Tokenization</h1>
          <p className="text-sm text-muted-foreground">Institutional real-world asset lifecycle management</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none">
              <Plus size={16} />
              Tokenize New Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] glass-dark border-border">
            <DialogHeader>
              <DialogTitle className="text-xl">Tokenize Asset</DialogTitle>
              <p className="text-sm text-muted-foreground">Submit a new real-world asset for institutional tokenization.</p>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. London Tech Hub Tower" className="bg-background/50 border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass-dark border-border">
                            {categories.filter(c => c !== "All").map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="valuation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Valuation ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100000000" className="bg-background/50 border-border font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none" disabled={tokenizeAsset.isPending}>
                  {tokenizeAsset.isPending ? "Processing..." : "Initiate Tokenization"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search assets, symbols, or locations..." 
            className="pl-10 bg-background/50 border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                activeCategory === category 
                  ? "bg-primary/10 text-primary border-primary/30 glow-cyan" 
                  : "bg-background/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAssets.map((asset, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={asset.id}
              className="glass-dark rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer"
            >
              <div className="p-5 border-b border-border/50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/50 border border-border w-fit text-xs font-medium">
                    {getCategoryIcon(asset.category)}
                    {asset.category}
                  </div>
                  <StatusBadge status={asset.status} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">{asset.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted border border-border">{asset.tokenSymbol}</span>
                  {asset.location}
                </p>
              </div>
              
              <div className="p-5 bg-background/30 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Valuation</p>
                  <p className="text-lg font-mono font-semibold">{formatCompactCurrency(asset.valuation, asset.currency)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Risk Score</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-lg font-mono font-semibold ${asset.aiRiskScore < 3 ? 'text-emerald-500' : asset.aiRiskScore < 5 ? 'text-amber-500' : 'text-destructive'}`}>
                      {asset.aiRiskScore}/10
                    </p>
                    <span className="text-[10px] text-muted-foreground">({asset.aiConfidence}% conf)</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Liquidity</p>
                  <p className="text-sm font-medium text-foreground">{asset.liquidityRating}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available</p>
                  <p className="text-sm font-mono text-foreground">{formatCompactCurrency(asset.availableTokens * (asset.valuation / asset.totalTokens), asset.currency)}</p>
                </div>
              </div>
              
              <div className="px-5 py-4 border-t border-border/50 flex justify-between items-center bg-background/50">
                <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                  View full analysis <ChevronRight size={14} />
                </span>
                {asset.status === "Tokenized" ? (
                  <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all ml-auto">
                    Trade Allocation
                  </Button>
                ) : (
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none ml-auto">
                    Approve Tokenization
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
