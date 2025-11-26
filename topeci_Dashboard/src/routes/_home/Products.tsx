import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  Star,
  TrendingUp,
  Calendar,
  X,
  Filter,
  Download,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_home/Products")({
  component: RouteComponent,
});

// Types pour les données
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  stock: number;
  sales: number;
  status: "active" | "inactive";
  lastUpdated: string;
  image: string;
  description: string;
  features: string[];
}

function RouteComponent() {
  // États pour la gestion des données
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Données de démonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Mon Premier Livre Audio Dioula - Français",
      category: "Livre Audio",
      price: 16500,
      currency: "FCFA",
      rating: 4.7,
      reviews: 43,
      stock: 18,
      sales: 240,
      status: "active",
      lastUpdated: "2024-03-15",
      image: "/api/placeholder/80/80",
      description:
        "Découvrez la richesse de la langue dioula à travers ce livre audio interactif...",
      features: [
        "40 pages illustrées",
        "Audio natif studio",
        "15 chansons",
        "10 activités interactives",
        "Guide de prononciation",
        "Papier écologique",
      ],
    },
    {
      id: "2",
      name: "Cours de Français Débutant",
      category: "Apprentissage",
      price: 12500,
      currency: "FCFA",
      rating: 4.5,
      reviews: 28,
      stock: 25,
      sales: 180,
      status: "active",
      lastUpdated: "2024-03-10",
      image: "/api/placeholder/80/80",
      description: "Apprenez le français facilement avec nos cours interactifs",
      features: [
        "30 leçons progressives",
        "Exercices interactifs",
        "Support audio",
        "Quiz d'évaluation",
      ],
    },
    {
      id: "3",
      name: "Dictionnaire Dioula-Français",
      category: "Référence",
      price: 8900,
      currency: "FCFA",
      rating: 4.8,
      reviews: 67,
      stock: 0,
      sales: 320,
      status: "inactive",
      lastUpdated: "2024-03-08",
      image: "/api/placeholder/80/80",
      description: "Dictionnaire complet dioula-français avec prononciation",
      features: [
        "5000 mots",
        "Prononciation audio",
        "Exemples contextuels",
        "Recherche rapide",
      ],
    },
    {
      id: "4",
      name: "Cahier d'Exercices Mathématiques",
      category: "Éducation",
      price: 7500,
      currency: "FCFA",
      rating: 4.3,
      reviews: 34,
      stock: 42,
      sales: 156,
      status: "active",
      lastUpdated: "2024-03-12",
      image: "/api/placeholder/80/80",
      description: "Cahier d'exercices de mathématiques pour primaire",
      features: [
        "100 exercices",
        "Corrigés inclus",
        "Niveaux progressifs",
        "Illustrations colorées",
      ],
    },
    {
      id: "5",
      name: "Guide de Conversation Baoulé",
      category: "Livre Audio",
      price: 14200,
      currency: "FCFA",
      rating: 4.6,
      reviews: 52,
      stock: 15,
      sales: 198,
      status: "active",
      lastUpdated: "2024-03-14",
      image: "/api/placeholder/80/80",
      description: "Apprenez les expressions courantes en baoulé",
      features: [
        "200 expressions",
        "Dialogues pratiques",
        "Audio natif",
        "Guide culturel",
      ],
    },
    {
      id: "6",
      name: "Cours d'Anglais Business",
      category: "Apprentissage",
      price: 18900,
      currency: "FCFA",
      rating: 4.9,
      reviews: 89,
      stock: 8,
      sales: 275,
      status: "active",
      lastUpdated: "2024-03-11",
      image: "/api/placeholder/80/80",
      description: "Maîtrisez l'anglais professionnel pour le business",
      features: [
        "Vocabulaire business",
        "Situations professionnelles",
        "Exercices pratiques",
        "Certificat inclus",
      ],
    },
    {
      id: "7",
      name: "Histoire de la Côte d'Ivoire",
      category: "Culture",
      price: 11200,
      currency: "FCFA",
      rating: 4.4,
      reviews: 41,
      stock: 0,
      sales: 167,
      status: "inactive",
      lastUpdated: "2024-03-09",
      image: "/api/placeholder/80/80",
      description: "Découvrez l'histoire riche de la Côte d'Ivoire",
      features: [
        "Chronologie complète",
        "Photos historiques",
        "Biographies",
        "Cartes anciennes",
      ],
    },
    {
      id: "8",
      name: "Cuisine Ivoirienne Traditionnelle",
      category: "Lifestyle",
      price: 9800,
      currency: "FCFA",
      rating: 4.7,
      reviews: 76,
      stock: 33,
      sales: 210,
      status: "active",
      lastUpdated: "2024-03-13",
      image: "/api/placeholder/80/80",
      description:
        "Recettes traditionnelles ivoiriennes avec techniques modernes",
      features: [
        "50 recettes",
        "Photos HD",
        "Vidéos tutoriels",
        "Listes de courses",
      ],
    },
  ];

  // Catégories disponibles
  const categories = [
    "all",
    "Livre Audio",
    "Apprentissage",
    "Référence",
    "Éducation",
    "Culture",
    "Lifestyle",
  ];

  // Chargement initial des données
  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filtrage des produits
  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (product) => product.status === selectedStatus
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Gestion des actions
  const handleViewProduct = (product: Product) => {
    console.log("Voir produit:", product.name);
    // Implémenter la logique de visualisation
  };

  const handleEditProduct = (product: Product) => {
    console.log("Modifier produit:", product.name);
    // Implémenter la logique d'édition
  };

  const handleManageStock = (product: Product) => {
    console.log("Gérer stock:", product.name);
    // Implémenter la logique de gestion de stock
  };

  const handleDeleteProduct = (product: Product) => {
    console.log("Supprimer produit:", product.name);
    // Implémenter la logique de suppression
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  const formatPrice = (price: number, currency: string) => {
    return price.toLocaleString("fr-FR") + " " + currency;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600 bg-red-100";
    if (stock < 10) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return "Rupture de stock";
    if (stock < 10) return `Stock faible : ${stock}`;
    return `En stock : ${stock}`;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produits</h2>
          <p className="text-gray-600">
            Gérez vos produits, prix, stock et contenus
          </p>
        </div>

        <Button className="bg-[#BE356A] hover:bg-[#a52e5b] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtre Catégorie */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent"
          >
            <option value="all">Toutes les catégories</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          {/* Filtre Statut */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Désactivé</option>
          </select>

          {/* Bouton Reset */}
          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset filtres
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
            <p className="text-gray-600 text-sm">Total produits</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {products.filter((p) => p.status === "active").length}
            </p>
            <p className="text-gray-600 text-sm">Produits actifs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {products.filter((p) => p.stock < 10 && p.stock > 0).length}
            </p>
            <p className="text-gray-600 text-sm">Stock faible</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {products.filter((p) => p.stock === 0).length}
            </p>
            <p className="text-gray-600 text-sm">Rupture de stock</p>
          </div>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* En-tête du tableau */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-3">Produit</div>
            <div className="col-span-1">Catégorie</div>
            <div className="col-span-1">Prix</div>
            <div className="col-span-1">Évaluation</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-1">Ventes</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-1">Mise à jour</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y divide-gray-200">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Produit */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Catégorie */}
                <div className="col-span-1">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                {/* Prix */}
                <div className="col-span-1">
                  <p className="font-semibold text-gray-900">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>

                {/* Évaluation */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Stock */}
                <div className="col-span-1">
                  <Badge className={`text-xs ${getStockColor(product.stock)}`}>
                    {getStockText(product.stock)}
                  </Badge>
                </div>

                {/* Ventes */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-900">
                      {product.sales}
                    </span>
                  </div>
                </div>

                {/* Statut */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        product.status === "active"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {product.status === "active" ? "Actif" : "Désactivé"}
                    </span>
                  </div>
                </div>

                {/* Dernière mise à jour */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(product.lastUpdated)}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleManageStock(product)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Gérer le stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
              <p className="text-gray-400 mt-2">
                {searchTerm ||
                selectedCategory !== "all" ||
                selectedStatus !== "all"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Commencez par ajouter votre premier produit"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de {indexOfFirstProduct + 1} à{" "}
                {Math.min(indexOfLastProduct, filteredProducts.length)} sur{" "}
                {filteredProducts.length} produits
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        );
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
