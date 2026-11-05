
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
    LineChart,
    Line
} from "recharts";

import {
    LayoutDashboard,
    Package,
    BarChart3,
    Zap,
    Boxes,
    FileText,
    Settings,
    Plus,
    Pencil,
    Trash2,
    Download,
    Search,
    RefreshCw,
    Star,
    IndianRupee,
    AlertTriangle,
    X,
    Check,
    Play
} from "lucide-react";

import "./style.css";

/* ---------------- SAMPLE DATA ---------------- */

const sample = [
    { id: 1, name: "Nova Headphones", category: "Electronics", price: 2499, rating: 4.6, popularity: 870, discount: 15, stock: 28 },
    { id: 2, name: "Trail Backpack", category: "Fashion", price: 1799, rating: 4.3, popularity: 540, discount: 20, stock: 45 },
    { id: 3, name: "Smart Watch X", category: "Electronics", price: 5999, rating: 4.8, popularity: 1200, discount: 10, stock: 16 },
    { id: 4, name: "Everyday Sneakers", category: "Fashion", price: 3299, rating: 4.1, popularity: 690, discount: 25, stock: 32 },
    { id: 5, name: "Desk Lamp", category: "Home", price: 999, rating: 4.5, popularity: 420, discount: 12, stock: 73 },
    { id: 6, name: "Mechanical Keyboard", category: "Electronics", price: 4599, rating: 4.7, popularity: 960, discount: 18, stock: 21 },
    { id: 7, name: "Ceramic Bottle", category: "Home", price: 699, rating: 4.2, popularity: 310, discount: 8, stock: 88 },
    { id: 8, name: "Running Jacket", category: "Fashion", price: 2899, rating: 4.4, popularity: 730, discount: 30, stock: 19 }
];

const algorithms = [
    ["merge", "Merge Sort", "O(n log n)"],
    ["quick", "Quick Sort", "O(n log n) average"],
    ["heap", "Heap Sort", "O(n log n)"],
    ["insertion", "Insertion Sort", "O(n²)"],
    ["selection", "Selection Sort", "O(n²)"],
    ["bubble", "Bubble Sort", "O(n²)"]
];

const colors = [
    "#7767e8",
    "#28a889",
    "#e9a23b",
    "#e36d83",
    "#4b9bd5",
    "#9b75c9"
];

const money = value =>
    "₹" + Number(value || 0).toLocaleString("en-IN");

/* ---------------- SORTING ALGORITHMS ---------------- */

function sortData(items, algorithm, field, direction) {
    const a = [...items];

    const compare = (x, y) => {
        let result;

        if (field === "name") {
            result = String(x[field] || "").localeCompare(
                String(y[field] || "")
            );
        } else {
            result = Number(x[field] || 0) - Number(y[field] || 0);
        }

        return direction === "asc" ? result : -result;
    };

    // BUBBLE SORT
    if (algorithm === "bubble") {
        for (let i = 0; i < a.length - 1; i++) {
            for (let j = 0; j < a.length - i - 1; j++) {
                if (compare(a[j], a[j + 1]) > 0) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                }
            }
        }

        return a;
    }

    // SELECTION SORT
    if (algorithm === "selection") {
        for (let i = 0; i < a.length - 1; i++) {
            let min = i;

            for (let j = i + 1; j < a.length; j++) {
                if (compare(a[j], a[min]) < 0) {
                    min = j;
                }
            }

            if (min !== i) {
                [a[i], a[min]] = [a[min], a[i]];
            }
        }

        return a;
    }

    // INSERTION SORT
    if (algorithm === "insertion") {
        for (let i = 1; i < a.length; i++) {
            const current = a[i];
            let j = i - 1;

            while (j >= 0 && compare(a[j], current) > 0) {
                a[j + 1] = a[j];
                j--;
            }

            a[j + 1] = current;
        }

        return a;
    }

    // QUICK SORT
    if (algorithm === "quick") {
        function quickSort(low, high) {
            if (low >= high) return;

            const pivot = a[high];
            let i = low;

            for (let j = low; j < high; j++) {
                if (compare(a[j], pivot) <= 0) {
                    [a[i], a[j]] = [a[j], a[i]];
                    i++;
                }
            }

            [a[i], a[high]] = [a[high], a[i]];

            quickSort(low, i - 1);
            quickSort(i + 1, high);
        }

        quickSort(0, a.length - 1);
        return a;
    }

    // HEAP SORT
    if (algorithm === "heap") {
        function heapify(n, i) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (
                left < n &&
                compare(a[left], a[largest]) > 0
            ) {
                largest = left;
            }

            if (
                right < n &&
                compare(a[right], a[largest]) > 0
            ) {
                largest = right;
            }

            if (largest !== i) {
                [a[i], a[largest]] = [a[largest], a[i]];
                heapify(n, largest);
            }
        }

        for (
            let i = Math.floor(a.length / 2) - 1;
            i >= 0;
            i--
        ) {
            heapify(a.length, i);
        }

        for (let i = a.length - 1; i > 0; i--) {
            [a[0], a[i]] = [a[i], a[0]];
            heapify(i, 0);
        }

        return a;
    }

    // MERGE SORT
    function mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const middle = Math.floor(arr.length / 2);

        const left = mergeSort(arr.slice(0, middle));
        const right = mergeSort(arr.slice(middle));

        const result = [];

        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            if (compare(left[i], right[j]) <= 0) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        return [
            ...result,
            ...left.slice(i),
            ...right.slice(j)
        ];
    }

    return mergeSort(a);
}

/* ---------------- MAIN APPLICATION ---------------- */

function App() {
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem("sortify-products");
            return saved ? JSON.parse(saved) : sample;
        } catch {
            return sample;
        }
    });

    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem("sortify-settings");
            return saved ? JSON.parse(saved) : { lowStock: 25 };
        } catch {
            return { lowStock: 25 };
        }
    });

    const [page, setPage] = useState("Dashboard");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [algorithm, setAlgorithm] = useState("merge");
    const [field, setField] = useState("price");
    const [direction, setDirection] = useState("asc");

    const [sortTime, setSortTime] = useState(null);
    const [sortedProducts, setSortedProducts] = useState(null);

    const [bench, setBench] = useState([]);

    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const empty = {
        name: "",
        category: "Electronics",
        price: 0,
        rating: 4,
        popularity: 0,
        discount: 0,
        stock: 0
    };

    const [form, setForm] = useState(empty);

    /* SAVE DATA */

    useEffect(() => {
        localStorage.setItem(
            "sortify-products",
            JSON.stringify(products)
        );
    }, [products]);

    useEffect(() => {
        localStorage.setItem(
            "sortify-settings",
            JSON.stringify(settings)
        );
    }, [settings]);

    /* FILTER PRODUCTS */

    const filtered = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const displayed = sortedProducts || filtered;

    /* ANALYTICS */

    const totalValue = products.reduce(
        (sum, product) => sum + product.price * product.stock,
        0
    );

    const average = products.length
        ? (
            products.reduce((sum, product) => sum + Number(product.rating), 0) /
            products.length
        ).toFixed(1)
        : "0.0";

    const lowStock = products.filter(
        product => product.stock < settings.lowStock
    );

    const categories = Object.entries(
        products.reduce((result, product) => {
            result[product.category] =
                (result[product.category] || 0) + 1;

            return result;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    const prices = products.map(product => ({
        name:
            product.name.length > 13
                ? product.name.slice(0, 13) + "…"
                : product.name,
        price: product.price
    }));

    const popularity = [...products]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 6);

    /* SORT PRODUCTS */

    function runSort() {
        const start = performance.now();

        const result = sortData(
            filtered,
            algorithm,
            field,
            direction
        );

        const end = performance.now();

        setSortTime(end - start);
        setSortedProducts(result);
    }

    /* ADD PRODUCT */

    function openAdd() {
        setEditing(null);
        setForm({ ...empty });
        setModal(true);
    }

    /* EDIT PRODUCT */

    function openEdit(product) {
        setEditing(product.id);
        setForm({ ...product });
        setModal(true);
    }

    /* SAVE PRODUCT */

    function saveProduct(e) {
        e.preventDefault();

        const product = {
            ...form,
            id: editing ?? Date.now(),
            price: Number(form.price),
            rating: Number(form.rating),
            popularity: Number(form.popularity),
            discount: Number(form.discount),
            stock: Number(form.stock)
        };

        if (editing !== null) {
            setProducts(old =>
                old.map(item =>
                    item.id === editing ? product : item
                )
            );
        } else {
            setProducts(old => [...old, product]);
        }

        setSortedProducts(null);
        setSortTime(null);
        setModal(false);
    }

    /* DELETE PRODUCT */

    function removeProduct(id) {
        if (window.confirm("Delete this product?")) {
            setProducts(old =>
                old.filter(product => product.id !== id)
            );

            setSortedProducts(null);
            setSortTime(null);
        }
    }

    /* UPDATE STOCK */

    function stockChange(id, amount) {
        setProducts(old =>
            old.map(product =>
                product.id === id
                    ? {
                        ...product,
                        stock: Math.max(0, product.stock + amount)
                    }
                    : product
            )
        );
    }

    /* ALGORITHM BENCHMARK */

    function benchmark() {
        const source = Array.from(
            { length: 700 },
            (_, i) => ({
                id: i,
                name: "Product " + i,
                price: Math.floor(Math.random() * 100000)
            })
        );

        const results = algorithms.map(([id, name]) => {
            const start = performance.now();

            sortData(source, id, "price", "asc");

            const end = performance.now();

            return {
                algorithm: name,
                milliseconds: Number((end - start).toFixed(3))
            };
        });

        setBench(results);
    }

    /* EXPORT CSV */

    function exportCSV() {
        const rows = [
            [
                "ID",
                "Name",
                "Category",
                "Price",
                "Rating",
                "Popularity",
                "Discount",
                "Stock"
            ],

            ...products.map(product => [
                product.id,
                product.name,
                product.category,
                product.price,
                product.rating,
                product.popularity,
                product.discount,
                product.stock
            ])
        ];

        const csv = rows
            .map(row =>
                row
                    .map(value =>
                        '"' + String(value).replace(/"/g, '""') + '"'
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "sortify-report.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    /* NAVIGATION */

    const nav = [
        ["Dashboard", LayoutDashboard],
        ["Products", Package],
        ["Analytics", BarChart3],
        ["Algorithm Lab", Zap],
        ["Inventory", Boxes],
        ["Reports", FileText],
        ["Settings", Settings]
    ];

    const descriptions = {
        Dashboard: "Your product operations at a glance.",
        Products: "Manage, search, sort and update your catalog.",
        Analytics: "Live insights calculated from your product data.",
        "Algorithm Lab": "Explore and compare sorting algorithms.",
        Inventory: "Monitor stock levels and low-stock items.",
        Reports: "Export and review your product data.",
        Settings: "Customize your Sortify workspace."
    };

    /* ---------------- USER INTERFACE ---------------- */

    return (
        <div className="app-shell">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="brand">
                    <b>S</b>
                    <span>sortify<em>.</em></span>
                </div>

                <p className="workspace-label">WORKSPACE</p>

                <nav>
                    {nav.map(([label, Icon]) => (
                        <button
                            key={label}
                            className={
                                "nav-item " +
                                (page === label ? "active" : "")
                            }
                            onClick={() => setPage(label)}
                        >
                            <Icon size={17} />
                            {label}

                            {label === "Inventory" &&
                                lowStock.length > 0 && (
                                    <i className="nav-count">
                                        {lowStock.length}
                                    </i>
                                )}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="profile">
                        <div className="avatar">AS</div>

                        <div>
                            <b>Amritpal Singh</b>
                            <small>Administrator</small>
                        </div>
                    </div>

                    <div className="version">
                        SORTIFY · VERSION 1.0
                    </div>
                </div>

            </aside>

            {/* MAIN CONTENT */}

            <main className="main-area">

                {/* HEADER */}

                <header className="topbar">

                    <div>
                        <div className="eyebrow">
                            PRODUCT INTELLIGENCE / {page.toUpperCase()}
                        </div>

                        <h1>{page}</h1>

                        <p>{descriptions[page]}</p>
                    </div>

                    <div className="top-actions">

                        <span className="live-dot">
                            ● Local data saved
                        </span>

                        <button
                            className="btn primary"
                            onClick={openAdd}
                        >
                            <Plus size={16} />
                            Add product
                        </button>

                    </div>

                </header>

                {/* DASHBOARD */}

                {page === "Dashboard" && (
                    <>

                        <div className="metric-grid">

                            <Metric
                                icon={Package}
                                label="Total products"
                                value={products.length}
                                foot="In your catalog"
                            />

                            <Metric
                                icon={IndianRupee}
                                label="Inventory value"
                                value={money(totalValue)}
                                foot="Price × stock"
                            />

                            <Metric
                                icon={Star}
                                label="Average rating"
                                value={average + "/5"}
                                foot="Across all products"
                            />

                            <Metric
                                icon={AlertTriangle}
                                label="Low stock items"
                                value={lowStock.length}
                                foot={"Below " + settings.lowStock + " units"}
                            />

                        </div>

                        <div className="dashboard-grid">

                            <section className="panel span-two">

                                <PanelHead
                                    title="Product catalog"
                                    sub="Your current inventory"
                                    action={
                                        <button
                                            className="text-button"
                                            onClick={() => setPage("Products")}
                                        >
                                            View all →
                                        </button>
                                    }
                                />

                                <ProductTable
                                    rows={products.slice(0, 5)}
                                    onEdit={openEdit}
                                    onDelete={removeProduct}
                                />

                            </section>

                            <section className="panel">

                                <PanelHead
                                    title="Categories"
                                    sub="Product distribution"
                                />

                                <ResponsiveContainer width="100%" height={230}>
                                    <PieChart>
                                        <Pie
                                            data={categories}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={82}
                                            label
                                        >
                                            {categories.map((item, index) => (
                                                <Cell
                                                    key={item.name}
                                                    fill={colors[index % colors.length]}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>

                            </section>

                            <section className="panel">

                                <PanelHead
                                    title="Top products"
                                    sub="By popularity"
                                />

                                {popularity.map(product => (
                                    <div className="rank-row" key={product.id}>
                                        <span>{product.name}</span>
                                        <b>{product.popularity.toLocaleString()}</b>
                                    </div>
                                ))}

                            </section>

                        </div>

                    </>
                )}

                {/* PRODUCTS */}

                {page === "Products" && (
                    <section className="panel">

                        <PanelHead
                            title="Product catalog"
                            sub={`${filtered.length} products found`}
                            action={
                                <button
                                    className="btn secondary"
                                    onClick={() => {
                                        setSearch("");
                                        setCategory("All");
                                        setSortedProducts(null);
                                        setSortTime(null);
                                    }}
                                >
                                    <RefreshCw size={14} />
                                    Reset filters
                                </button>
                            }
                        />

                        <div className="toolbar">

                            <div className="search-box">
                                <Search size={16} />

                                <input
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={e => {
                                        setSearch(e.target.value);
                                        setSortedProducts(null);
                                        setSortTime(null);
                                    }}
                                />
                            </div>

                            <select
                                value={category}
                                onChange={e => {
                                    setCategory(e.target.value);
                                    setSortedProducts(null);
                                    setSortTime(null);
                                }}
                            >
                                <option value="All">All</option>

                                {[
                                    "Electronics",
                                    "Fashion",
                                    "Home",
                                    "Sports",
                                    "Beauty",
                                    "Other"
                                ].map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <ProductTable
                            rows={displayed}
                            onEdit={openEdit}
                            onDelete={removeProduct}
                        />

                    </section>
                )}

                {/* ANALYTICS */}

                {page === "Analytics" && (
                    <>

                        <div className="metric-grid">

                            <Metric
                                icon={Package}
                                label="Total products"
                                value={products.length}
                                foot="Catalog size"
                            />

                            <Metric
                                icon={IndianRupee}
                                label="Total stock value"
                                value={money(totalValue)}
                                foot="Price multiplied by stock"
                            />

                            <Metric
                                icon={Star}
                                label="Average rating"
                                value={average + "/5"}
                                foot="Product rating average"
                            />

                            <Metric
                                icon={AlertTriangle}
                                label="Stock alerts"
                                value={lowStock.length}
                                foot="Items below threshold"
                            />

                        </div>

                        <div className="dashboard-grid">

                            <section className="panel">

                                <PanelHead
                                    title="Category distribution"
                                    sub="Number of products per category"
                                />

                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={categories}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={95}
                                            label
                                        >
                                            {categories.map((item, index) => (
                                                <Cell
                                                    key={item.name}
                                                    fill={colors[index % colors.length]}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>

                            </section>

                            <section className="panel">

                                <PanelHead
                                    title="Product prices"
                                    sub="Price comparison across products"
                                />

                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={prices}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: 10 }}
                                        />

                                        <YAxis />

                                        <Tooltip
                                            formatter={value => money(value)}
                                        />

                                        <Bar
                                            dataKey="price"
                                            fill="#7767e8"
                                            radius={[5, 5, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>

                            </section>

                            <section className="panel span-two">

                                <PanelHead
                                    title="Popularity analysis"
                                    sub="Most popular products"
                                />

                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={popularity}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: 10 }}
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            dataKey="popularity"
                                            stroke="#28a889"
                                            strokeWidth={3}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>

                            </section>

                        </div>

                    </>
                )}

                {/* ALGORITHM LAB */}

                {page === "Algorithm Lab" && (
                    <>

                        <section className="panel">

                            <PanelHead
                                title="Sorting configuration"
                                sub="Choose an algorithm and sorting criteria"
                            />

                            <div className="lab-controls">

                                <label>
                                    Algorithm

                                    <select
                                        value={algorithm}
                                        onChange={e => setAlgorithm(e.target.value)}
                                    >
                                        {algorithms.map(([id, name, complexity]) => (
                                            <option value={id} key={id}>
                                                {name} — {complexity}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Sort field

                                    <select
                                        value={field}
                                        onChange={e => setField(e.target.value)}
                                    >
                                        <option value="price">Price</option>
                                        <option value="rating">Rating</option>
                                        <option value="popularity">Popularity</option>
                                        <option value="discount">Discount</option>
                                        <option value="name">Name</option>
                                    </select>
                                </label>

                                <label>
                                    Order

                                    <select
                                        value={direction}
                                        onChange={e => setDirection(e.target.value)}
                                    >
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </label>

                                <button
                                    className="btn primary"
                                    onClick={runSort}
                                >
                                    <Play size={15} />
                                    Run sort
                                </button>

                            </div>

                            <div className="algorithm-cards">

                                {algorithms.map(([id, name, complexity]) => (
                                    <button
                                        key={id}
                                        className={
                                            "algorithm-card " +
                                            (algorithm === id ? "selected" : "")
                                        }
                                        onClick={() => setAlgorithm(id)}
                                    >
                                        <b>{name}</b>
                                        <span>{complexity}</span>
                                    </button>
                                ))}

                            </div>

                            {sortTime !== null && (
                                <div className="notice">
                                    <Check size={15} />

                                    Sorted {filtered.length} products using{" "}
                                    {algorithms.find(item => item[0] === algorithm)?.[1]}{" "}
                                    in {sortTime.toFixed(4)} ms.
                                </div>
                            )}

                            <ProductTable
                                rows={displayed}
                                onEdit={openEdit}
                                onDelete={removeProduct}
                            />

                            <p className="callout">
                                Note: this version executes sorting algorithms
                                in the browser. C++ REST API integration is a
                                separate next step.
                            </p>

                        </section>

                        {/* BENCHMARK */}

                        <section className="panel">

                            <PanelHead
                                title="Algorithm benchmark"
                                sub="Compare all six algorithms on a generated dataset"
                                action={
                                    <button
                                        className="btn secondary"
                                        onClick={benchmark}
                                    >
                                        <RefreshCw size={15} />
                                        Run benchmark
                                    </button>
                                }
                            />

                            {bench.length > 0 ? (
                                <>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={bench}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="algorithm"
                                                tick={{ fontSize: 10 }}
                                            />

                                            <YAxis />

                                            <Tooltip
                                                formatter={value => value + " ms"}
                                            />

                                            <Bar
                                                dataKey="milliseconds"
                                                fill="#7767e8"
                                                radius={[5, 5, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>

                                    {bench.map(item => (
                                        <div
                                            className="rank-row"
                                            key={item.algorithm}
                                        >
                                            <span>{item.algorithm}</span>
                                            <b>{item.milliseconds} ms</b>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="empty-state">
                                    Click Run benchmark to compare the algorithms.
                                </div>
                            )}

                        </section>

                    </>
                )}

                {/* INVENTORY */}

                {page === "Inventory" && (
                    <section className="panel">

                        <PanelHead
                            title="Inventory control"
                            sub={`${lowStock.length} products need attention`}
                        />

                        {products.map(product => (
                            <div className="inventory-item" key={product.id}>

                                <div className="product-mark">
                                    {product.name[0]}
                                </div>

                                <div className="inventory-name">
                                    <b>{product.name}</b>
                                    <small>
                                        {product.category} · {money(product.price)}
                                    </small>
                                </div>

                                <div className="stock-meter">
                                    <b>{product.stock} units</b>

                                    <div className="meter">
                                        <i
                                            style={{
                                                width:
                                                    Math.min(
                                                        100,
                                                        product.stock
                                                    ) + "%"
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="stock-actions">

                                    <button
                                        onClick={() => stockChange(product.id, -1)}
                                        disabled={!product.stock}
                                    >
                                        −
                                    </button>

                                    <button
                                        onClick={() => stockChange(product.id, 1)}
                                    >
                                        +
                                    </button>

                                    <button onClick={() => openEdit(product)}>
                                        <Pencil size={14} />
                                    </button>

                                </div>

                                {product.stock < settings.lowStock && (
                                    <span className="low-badge">
                                        LOW STOCK
                                    </span>
                                )}

                            </div>
                        ))}

                    </section>
                )}

                {/* REPORTS */}

                {page === "Reports" && (
                    <>

                        <div className="metric-grid">

                            <Metric
                                icon={Package}
                                label="Products"
                                value={products.length}
                                foot="In report"
                            />

                            <Metric
                                icon={IndianRupee}
                                label="Inventory value"
                                value={money(totalValue)}
                                foot="Current valuation"
                            />

                            <Metric
                                icon={AlertTriangle}
                                label="Low stock"
                                value={lowStock.length}
                                foot="Needs review"
                            />

                            <Metric
                                icon={Star}
                                label="Average rating"
                                value={average + "/5"}
                                foot="Catalog average"
                            />

                        </div>

                        <section className="panel report-panel">

                            <FileText size={35} />

                            <h2>Product inventory report</h2>

                            <p>
                                Export your current catalog, including price,
                                category, rating, popularity, discount and stock.
                            </p>

                            <button
                                className="btn primary"
                                onClick={exportCSV}
                            >
                                <Download size={16} />
                                Download CSV report
                            </button>

                            <div className="report-preview">
                                <b>Report preview</b>

                                <span>Products: {products.length}</span>

                                <span>
                                    Inventory value: {money(totalValue)}
                                </span>

                                <span>
                                    Low stock alerts: {lowStock.length}
                                </span>

                                <span>
                                    Generated: {new Date().toLocaleString()}
                                </span>
                            </div>

                        </section>

                    </>
                )}

                {/* SETTINGS */}

                {page === "Settings" && (
                    <section className="panel settings-panel">

                        <PanelHead
                            title="Workspace settings"
                            sub="Preferences are saved in this browser"
                        />

                        <label className="setting-row">

                            <span>
                                <b>Low-stock threshold</b>
                                <small>
                                    Flag products below this quantity.
                                </small>
                            </span>

                            <input
                                type="number"
                                min="1"
                                max="500"
                                value={settings.lowStock}
                                onChange={e =>
                                    setSettings(old => ({
                                        ...old,
                                        lowStock: Math.max(
                                            1,
                                            Number(e.target.value) || 1
                                        )
                                    }))
                                }
                            />

                        </label>

                        <div className="setting-row">

                            <span>
                                <b>Restore sample data</b>
                                <small>
                                    Replace your catalog with the original products.
                                </small>
                            </span>

                            <button
                                className="btn secondary"
                                onClick={() => {
                                    if (window.confirm("Restore sample products?")) {
                                        setProducts(sample);
                                        setSortedProducts(null);
                                        setSortTime(null);
                                    }
                                }}
                            >
                                <RefreshCw size={15} />
                                Restore
                            </button>

                        </div>

                        <div className="setting-row">

                            <span>
                                <b>Clear catalog</b>
                                <small>
                                    Delete all products from this browser.
                                </small>
                            </span>

                            <button
                                className="btn danger"
                                onClick={() => {
                                    if (window.confirm("Delete all products?")) {
                                        setProducts([]);
                                        setSortedProducts(null);
                                        setSortTime(null);
                                    }
                                }}
                            >
                                <Trash2 size={15} />
                                Clear
                            </button>

                        </div>

                        <p className="callout">
                            Your products and settings are saved in this
                            browser using localStorage. They are not yet
                            synchronized with MySQL.
                        </p>

                    </section>
                )}

                <footer>
                    Sortify · Advanced Data Structures Project · Product intelligence dashboard
                </footer>

            </main>

            {/* ADD / EDIT PRODUCT MODAL */}

            {modal && (
                <div
                    className="modal-backdrop"
                    onClick={e => {
                        if (e.target === e.currentTarget) {
                            setModal(false);
                        }
                    }}
                >

                    <form className="modal" onSubmit={saveProduct}>

                        <div className="modal-head">

                            <div>
                                <h2>
                                    {editing !== null
                                        ? "Edit product"
                                        : "Add new product"}
                                </h2>

                                <p>Enter product details.</p>
                            </div>

                            <button
                                type="button"
                                className="close-btn"
                                onClick={() => setModal(false)}
                            >
                                <X />
                            </button>

                        </div>

                        <label>
                            Product name

                            <input
                                required
                                value={form.name}
                                onChange={e =>
                                    setForm(old => ({
                                        ...old,
                                        name: e.target.value
                                    }))
                                }
                            />
                        </label>

                        <div className="form-grid">

                            <label>
                                Category

                                <select
                                    value={form.category}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            category: e.target.value
                                        }))
                                    }
                                >
                                    {[
                                        "Electronics",
                                        "Fashion",
                                        "Home",
                                        "Sports",
                                        "Beauty",
                                        "Other"
                                    ].map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Price

                                <input
                                    type="number"
                                    min="0"
                                    required
                                    value={form.price}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            price: e.target.value
                                        }))
                                    }
                                />
                            </label>

                            <label>
                                Rating

                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={form.rating}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            rating: e.target.value
                                        }))
                                    }
                                />
                            </label>

                            <label>
                                Popularity

                                <input
                                    type="number"
                                    min="0"
                                    value={form.popularity}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            popularity: e.target.value
                                        }))
                                    }
                                />
                            </label>

                            <label>
                                Discount (%)

                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={form.discount}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            discount: e.target.value
                                        }))
                                    }
                                />
                            </label>

                            <label>
                                Stock

                                <input
                                    type="number"
                                    min="0"
                                    value={form.stock}
                                    onChange={e =>
                                        setForm(old => ({
                                            ...old,
                                            stock: e.target.value
                                        }))
                                    }
                                />
                            </label>

                        </div>

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="btn secondary"
                                onClick={() => setModal(false)}
                            >
                                Cancel
                            </button>

                            <button className="btn primary" type="submit">
                                <Check size={15} />
                                {editing !== null
                                    ? "Save changes"
                                    : "Add product"}
                            </button>

                        </div>

                    </form>

                </div>
            )}

        </div>
    );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Metric({ icon: Icon, label, value, foot }) {
    return (
        <article className="metric-card">

            <div className="metric-top">
                <span>{label}</span>

                <i>
                    <Icon size={17} />
                </i>
            </div>

            <strong>{value}</strong>

            <small>{foot}</small>

        </article>
    );
}

function PanelHead({ title, sub, action }) {
    return (
        <div className="panel-head">

            <div>
                <h2>{title}</h2>
                <p>{sub}</p>
            </div>

            {action}

        </div>
    );
}

function ProductTable({ rows, onEdit, onDelete }) {
    return (
        <div className="table-scroll">

            <table>

                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>RATING</th>
                        <th>POPULARITY</th>
                        <th>DISCOUNT</th>
                        <th>STOCK</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>

                    {rows.map(product => (
                        <tr key={product.id}>

                            <td>
                                <b className="product-cell">
                                    <i>{product.name[0]}</i>
                                    {product.name}
                                </b>
                            </td>

                            <td>
                                <span className="category-chip">
                                    {product.category}
                                </span>
                            </td>

                            <td>
                                <b>{money(product.price)}</b>
                            </td>

                            <td className="rating-cell">
                                ★ {Number(product.rating).toFixed(1)}
                            </td>

                            <td>
                                {Number(product.popularity).toLocaleString()}
                            </td>

                            <td>
                                -{product.discount}%
                            </td>

                            <td>
                                {product.stock}
                            </td>

                            <td>
                                <div className="row-actions">

                                    <button
                                        title="Edit"
                                        onClick={() => onEdit(product)}
                                    >
                                        <Pencil size={14} />
                                    </button>

                                    <button
                                        title="Delete"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

            {rows.length === 0 && (
                <div className="empty-state">
                    No products found.
                </div>
            )}

        </div>
    );
}

/* ---------------- RENDER APPLICATION ---------------- */

createRoot(document.getElementById("root")).render(<App />);
