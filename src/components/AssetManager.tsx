import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/types/financial";
import { Home, Car, Plus, Trash2 } from "lucide-react";

interface AssetManagerProps {
  assets: Asset[];
  onAssetsChange: (assets: Asset[]) => void;
}

export const AssetManager = ({ assets, onAssetsChange }: AssetManagerProps) => {
  const [newAsset, setNewAsset] = useState({ name: "", value: 0, appreciationRate: 0 });

  const addAsset = () => {
    if (newAsset.name && newAsset.value > 0) {
      onAssetsChange([
        ...assets,
        {
          id: Date.now().toString(),
          ...newAsset,
        },
      ]);
      setNewAsset({ name: "", value: 0, appreciationRate: 0 });
    }
  };

  const removeAsset = (id: string) => {
    onAssetsChange(assets.filter((a) => a.id !== id));
  };

  const updateAsset = (id: string, field: keyof Asset, value: any) => {
    onAssetsChange(
      assets.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const getIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("home") || lowerName.includes("house") || lowerName.includes("property")) {
      return Home;
    }
    if (lowerName.includes("car") || lowerName.includes("vehicle")) {
      return Car;
    }
    return Home;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Major Assets</h3>
      
      {/* Existing Assets */}
      <div className="space-y-3 mb-6">
        {assets.map((asset) => {
          const Icon = getIcon(asset.name);
          return (
            <Card key={asset.id} className="p-4 bg-muted/30">
              <div className="grid gap-4 md:grid-cols-4 items-end">
                <div className="space-y-2">
                  <Label className="text-xs">Asset Name</Label>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <Input
                      value={asset.name}
                      onChange={(e) => updateAsset(asset.id, "name", e.target.value)}
                      placeholder="e.g., Primary Home"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Current Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      $
                    </span>
                    <Input
                      type="number"
                      value={asset.value}
                      onChange={(e) => updateAsset(asset.id, "value", parseFloat(e.target.value) || 0)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Appreciation Rate</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={asset.appreciationRate}
                      onChange={(e) =>
                        updateAsset(asset.id, "appreciationRate", parseFloat(e.target.value) || 0)
                      }
                      className="pr-8"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      %
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAsset(asset.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add New Asset */}
      <Card className="p-4 bg-primary/5 border-dashed">
        <div className="grid gap-4 md:grid-cols-4 items-end">
          <div className="space-y-2">
            <Label className="text-xs">Asset Name</Label>
            <Input
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              placeholder="e.g., Primary Home"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Current Value</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                $
              </span>
              <Input
                type="number"
                value={newAsset.value || ""}
                onChange={(e) => setNewAsset({ ...newAsset, value: parseFloat(e.target.value) || 0 })}
                className="pl-7"
                placeholder="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Appreciation Rate</Label>
            <div className="relative">
              <Input
                type="number"
                step="0.1"
                value={newAsset.appreciationRate || ""}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, appreciationRate: parseFloat(e.target.value) || 0 })
                }
                className="pr-8"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                %
              </span>
            </div>
          </div>
          <Button onClick={addAsset} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Asset
          </Button>
        </div>
      </Card>
    </Card>
  );
};
