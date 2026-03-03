import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface ShopEntry {
  offerId: string;
  regularPrice: number;
  finalPrice: number;
  bundle?: {
    name: string;
    image: string;
  };
  brItems?: Array<{
    id: string;
    name: string;
    description: string;
    rarity: { value: string; displayValue: string };
    images: { icon: string; featured?: string };
    set?: { value: string; displayValue: string };
    introduction?: { text: string };
  }>;
  tracks?: Array<{
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    releaseYear: number;
    bpm: number;
  }>;
  instruments?: Array<{
    id: string;
    name: string;
    images: { small: string; large: string };
  }>;
  cars?: Array<{
    id: string;
    name: string;
    images: { small: string; large: string };
  }>;
  newDisplayAsset?: {
    materialInstances?: Array<{
      images?: {
        OfferImage?: string;
        Background?: string;
      };
    }>;
    renderImages?: Array<{
      image: string;
    }>;
  };
  layout?: {
    name: string;
    id: string;
    category?: string;
  };
}

interface ShopData {
  status: number;
  data: {
    hash: string;
    date: string;
    vbuckIcon: string;
    entries: ShopEntry[];
  };
}

// Map rarity to gradient colors
const rarityGradients: Record<string, string> = {
  legendary: "from-amber-500/20 via-orange-500/10 to-transparent",
  epic: "from-purple-500/20 via-violet-500/10 to-transparent",
  rare: "from-blue-500/20 via-cyan-500/10 to-transparent",
  uncommon: "from-green-500/20 via-emerald-500/10 to-transparent",
  common: "from-slate-500/20 via-slate-400/10 to-transparent",
  icon: "from-cyan-500/20 via-blue-500/10 to-transparent",
  marvel: "from-red-500/20 via-red-600/10 to-transparent",
  dark: "from-pink-500/20 via-purple-500/10 to-transparent",
  starwars: "from-blue-600/20 via-blue-800/10 to-transparent",
  gaminglegends: "from-indigo-500/20 via-purple-500/10 to-transparent",
  dc: "from-blue-800/20 via-slate-800/10 to-transparent",
};

const rarityBorders: Record<string, string> = {
  legendary: "border-amber-500/30 hover:border-amber-500/60",
  epic: "border-purple-500/30 hover:border-purple-500/60",
  rare: "border-blue-500/30 hover:border-blue-500/60",
  uncommon: "border-green-500/30 hover:border-green-500/60",
  common: "border-slate-500/30 hover:border-slate-500/60",
  icon: "border-cyan-500/30 hover:border-cyan-500/60",
  marvel: "border-red-500/30 hover:border-red-500/60",
  dark: "border-pink-500/30 hover:border-pink-500/60",
  starwars: "border-blue-600/30 hover:border-blue-600/60",
  gaminglegends: "border-indigo-500/30 hover:border-indigo-500/60",
  dc: "border-blue-800/30 hover:border-blue-800/60",
};

const rarityLabels: Record<string, string> = {
  legendary: "text-amber-400",
  epic: "text-purple-400",
  rare: "text-blue-400",
  uncommon: "text-green-400",
  common: "text-slate-400",
  icon: "text-cyan-400",
  marvel: "text-red-400",
  dark: "text-pink-400",
  starwars: "text-blue-500",
  gaminglegends: "text-indigo-400",
  dc: "text-blue-700",
};

interface DisplayItem {
  id: string;
  name: string;
  rarity: string;
  rarityDisplay: string;
  price: number;
  regularPrice: number;
  icon: string | null;
  type: string;
  category: string;
  description?: string;
  setId?: string;
  introduction?: string;
}

export const ShopSection: React.FC = () => {
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeRarity, setActiveRarity] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<DisplayItem | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch("/api/fortnite/shop");
        if (res.ok) {
          const data = await res.json();
          setShop(data);
        }
      } catch (err) {
        console.error("Error fetching shop:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, []);

  const displayItems = useMemo(() => {
    if (!shop?.data?.entries) return [];
    const items: DisplayItem[] = [];

    for (const entry of shop.data.entries) {
      // Determine the name
      let name = "Item";
      let type = "Cosmetic";
      let rarityValue = "common";
      let rarityDisplay = "Comum";
      let icon = null;
      let description = "";
      let setId = undefined;
      let introduction = undefined;

      if (entry.bundle) {
        name = entry.bundle.name;
        icon = entry.bundle.image;
        type = "Pacotão";
        if (entry.brItems?.[0]) {
          rarityValue = entry.brItems[0].rarity.value;
          rarityDisplay = entry.brItems[0].rarity.displayValue;
          description = entry.brItems[0].description;
          setId = entry.brItems[0].set?.value;
          introduction = entry.brItems[0].introduction?.text;
        }
      } else if (entry.brItems && entry.brItems.length > 0) {
        const mainItem = entry.brItems[0];
        name = mainItem.name;
        type = "Cosmético";
        rarityValue = mainItem.rarity.value;
        rarityDisplay = mainItem.rarity.displayValue;
        icon = mainItem.images.featured || mainItem.images.icon;
        description = mainItem.description;
        setId = mainItem.set?.value;
        introduction = mainItem.introduction?.text;
      } else if (entry.tracks && entry.tracks.length > 0) {
        const track = entry.tracks[0];
        name = `${track.title} - ${track.artist}`;
        type = "Música de Jam";
        rarityValue = "icon";
        rarityDisplay = "Série Ícones";
        icon = track.albumArt;
        description = `Ano: ${track.releaseYear} • BPM: ${track.bpm}`;
      } else if (entry.instruments && entry.instruments.length > 0) {
        const inst = entry.instruments[0];
        name = inst.name;
        type = "Instrumento";
        icon = inst.images.large;
      } else if (entry.cars && entry.cars.length > 0) {
        const car = entry.cars[0];
        name = car.name;
        type = "Carro";
        icon = car.images.large;
      }

      // Try to get a better image from newDisplayAsset
      const renderImage = entry.newDisplayAsset?.renderImages?.[0]?.image;
      const materialImage =
        entry.newDisplayAsset?.materialInstances?.[0]?.images?.OfferImage;

      // Favor render images as they are high quality with transparent backgrounds
      icon = renderImage || materialImage || icon;

      const categoryName = entry.layout?.name || "Outros";

      items.push({
        id: entry.offerId,
        name,
        type,
        rarity: rarityValue.toLowerCase(),
        rarityDisplay: rarityDisplay || rarityValue,
        price: entry.finalPrice,
        regularPrice: entry.regularPrice,
        icon,
        category: categoryName,
        description,
        setId,
        introduction,
      });
    }
    return items;
  }, [shop]);

  // Deduplicate items by name
  const uniqueItems = useMemo(() => {
    return displayItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name),
    );
  }, [displayItems]);

  // Extract unique categories, translating some common ones if needed
  const { categoryTabs, rarityTabs, displayToRarity } = useMemo(() => {
    const categoriesSet = new Set(uniqueItems.map((item) => item.category));
    const raritiesSet = new Set(uniqueItems.map((item) => item.rarityDisplay));

    const displayToRarityMap = Object.fromEntries(
      uniqueItems.map((item) => [item.rarityDisplay, item.rarity]),
    );

    return {
      categoryTabs: ["All", ...Array.from(categoriesSet).filter(Boolean)],
      rarityTabs: ["All", ...Array.from(raritiesSet).filter(Boolean)],
      displayToRarity: displayToRarityMap,
    };
  }, [uniqueItems]);

  const filteredItems = useMemo(() => {
    return uniqueItems.filter((item) => {
      const passCategory =
        activeCategory === "All" || item.category === activeCategory;
      const passRarity =
        activeRarity === "All" || item.rarity === displayToRarity[activeRarity];
      return passCategory && passRarity;
    });
  }, [uniqueItems, activeCategory, activeRarity, displayToRarity]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-500">
        <span className="material-symbols-outlined text-primary text-6xl animate-spin-slow drop-shadow-[0_0_15px_rgba(20,255,0,0.5)]">
          sync
        </span>
        <p className="text-slate-500 mt-4 text-xs uppercase tracking-widest font-bold">
          Carregando Loja...
        </p>
      </div>
    );
  }

  if (!shop?.data?.entries) return null;

  if (uniqueItems.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-symbols-outlined text-slate-600 text-5xl">
          storefront
        </span>
        <p className="text-slate-500 mt-4 text-sm">
          Sem itens na loja no momento. Volte mais tarde!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="material-symbols-outlined text-primary text-3xl">
              storefront
            </span>
            <h2 className="text-2xl lg:text-4xl font-black text-white uppercase italic tracking-tighter">
              Loja de Itens
            </h2>
          </div>
          <p className="text-slate-500 text-xs lg:text-sm ml-12">
            {filteredItems.length} itens{" "}
            {activeCategory !== "All" && `em ${activeCategory}`}
          </p>
        </div>
      </div>

      {/* Filters (Category & Rarity) */}
      <div className="mb-8 space-y-4 relative">
        {/* Category Scroll */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 theme-scrollbar snap-x snap-mandatory">
            <div className="flex gap-3 min-w-max px-2">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 snap-center border-2 ${
                    activeCategory === cat
                      ? "bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(20,255,0,0.3)] scale-105"
                      : "bg-background-dark/80 text-slate-400 hover:text-white hover:border-slate-600 border-border-dark"
                  }`}
                >
                  {cat === "All" ? "Todos os Itens" : cat}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 bottom-4 w-12 bg-linear-to-l from-background-dark to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 bottom-4 w-12 bg-linear-to-r from-background-dark to-transparent pointer-events-none"></div>
        </div>

        {/* Rarity Scroll */}
        <div className="relative">
          <div className="overflow-x-auto pb-6 theme-scrollbar snap-x snap-mandatory">
            <div className="flex gap-2 min-w-max px-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center mr-2">
                Raridade:
              </span>
              {rarityTabs.map((rar) => {
                const rarKey = rar === "All" ? "common" : displayToRarity[rar];
                const activeColor = rarityLabels[rarKey] || rarityLabels.common;
                const activeBorder =
                  rarityBorders[rarKey] || rarityBorders.common;

                return (
                  <button
                    key={rar}
                    onClick={() => setActiveRarity(rar)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 snap-center border ${
                      activeRarity === rar
                        ? `bg-card-dark ${activeBorder} ${activeColor} shadow-md`
                        : "bg-background-dark/50 text-slate-500 border-border-dark hover:text-slate-300"
                    }`}
                  >
                    {rar === "All" ? "Todas" : rar}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredItems.map((item) => {
          const gradient =
            rarityGradients[item.rarity] || rarityGradients.common;
          const border = rarityBorders[item.rarity] || rarityBorders.common;
          const labelColor = rarityLabels[item.rarity] || rarityLabels.common;
          const isOnSale = item.regularPrice > item.price && item.price > 0;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`bg-card-dark border ${border} rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
              <div
                className={`h-40 bg-linear-to-t ${gradient} flex items-end justify-center relative overflow-hidden`}
              >
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center relative z-10">
                    <span className="material-symbols-outlined text-5xl text-white/10 group-hover:text-white/20 transition-colors">
                      diamond
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-card-dark via-transparent to-transparent z-10 pointer-events-none"></div>
                {isOnSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase">
                    Promoção
                  </div>
                )}
              </div>
              <div className="p-3 relative z-10 -mt-2">
                <h4 className="text-white font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {item.name}
                </h4>
                <p
                  className={`text-[9px] uppercase tracking-wider font-bold mb-2 ${labelColor}`}
                >
                  {item.rarityDisplay} • {item.type}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-md">
                    <Image
                      src={
                        shop?.data?.vbuckIcon ||
                        "https://fortnite-api.com/images/vbuck.png"
                      }
                      alt="V-Bucks"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    {isOnSale ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-white font-black text-xs">
                          {item.price.toLocaleString()}
                        </span>
                        <span className="text-slate-500 text-[10px] line-through font-bold">
                          {item.regularPrice.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white font-black text-xs">
                        {item.price > 0
                          ? item.price.toLocaleString()
                          : "Grátis"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Overlay */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-4 bg-background-dark/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-card-dark md:border border-border-dark md:rounded-2xl w-full h-full md:h-auto md:max-w-4xl overflow-y-auto overflow-x-hidden md:max-h-[90vh] shadow-2xl flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-60 flex items-center justify-center bg-black/50 hover:bg-black md:bg-black/80 md:hover:bg-black text-white p-2 md:p-2.5 rounded-full transition-colors backdrop-blur-md"
            >
              <span className="material-symbols-outlined block text-base md:text-xl">
                close
              </span>
            </button>

            {/* Image Side */}
            <div
              className={`w-full md:w-1/2 pt-16 pb-8 px-4 md:p-8 flex items-center justify-center relative min-h-[40vh] md:min-h-[300px] bg-linear-to-b ${rarityGradients[selectedItem.rarity] || rarityGradients.common}`}
            >
              {selectedItem.icon ? (
                <div className="relative w-full h-[30vh] md:h-[60vh]">
                  <Image
                    src={selectedItem.icon}
                    alt={selectedItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-4 duration-500"
                  />
                </div>
              ) : (
                <span className="material-symbols-outlined text-6xl md:text-9xl text-white/10">
                  diamond
                </span>
              )}
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-5 md:p-8 lg:p-12 flex flex-col justify-center bg-card-dark">
              <p
                className={`text-[9px] md:text-xs font-black uppercase tracking-widest mb-1 md:mb-2 ${rarityLabels[selectedItem.rarity] || rarityLabels.common}`}
              >
                {selectedItem.rarityDisplay} • {selectedItem.type}
              </p>

              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 md:mb-4 leading-none">
                {selectedItem.name}
              </h2>

              {selectedItem.description && (
                <p className="text-slate-400 text-xs md:text-lg mb-4 md:mb-6 italic border-l-2 border-slate-700 pl-3 md:pl-4 line-clamp-3 md:line-clamp-none">
                  &quot;{selectedItem.description}&quot;
                </p>
              )}

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {selectedItem.setId && (
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="material-symbols-outlined text-slate-500 text-xl">
                      category
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Conjunto
                      </p>
                      <p className="text-white font-medium">
                        {selectedItem.setId}
                      </p>
                    </div>
                  </div>
                )}
                {selectedItem.introduction && (
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-slate-500 text-xl">
                      history
                    </span>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Introdução
                      </p>
                      <p className="text-white font-medium">
                        {selectedItem.introduction}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 md:mt-auto pt-4 md:pt-6 border-t border-border-dark flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5 md:mb-1">
                    {selectedItem.regularPrice > selectedItem.price
                      ? "Preço Promocional"
                      : "Preço Atual"}
                  </p>
                  <div className="flex items-end gap-3 md:gap-4">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Image
                        src={
                          shop?.data?.vbuckIcon ||
                          "https://fortnite-api.com/images/vbuck.png"
                        }
                        alt="V-Bucks"
                        className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md"
                        width={24}
                        height={24}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">
                        {selectedItem.price > 0
                          ? selectedItem.price.toLocaleString()
                          : "Grátis"}
                      </span>
                    </div>

                    {selectedItem.regularPrice > selectedItem.price &&
                      selectedItem.price > 0 && (
                        <div className="pb-0.5 md:pb-1 relative">
                          <span className="text-slate-500 font-bold block text-sm md:text-base line-through">
                            {selectedItem.regularPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                {selectedItem.regularPrice > selectedItem.price &&
                  selectedItem.price > 0 && (
                    <div className="bg-primary/20 border border-primary/50 px-3 md:px-4 py-1 flex flex-col items-center justify-center transform rotate-2 rounded-lg">
                      <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest leading-none mb-1">
                        Desconto
                      </span>
                      <span className="text-white font-black text-sm md:text-base leading-none">
                        -
                        {Math.round(
                          (1 - selectedItem.price / selectedItem.regularPrice) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopSection;
