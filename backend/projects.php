<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$projects = [
    [
        "id" => "private-villa",
        "title" => "Private Villa",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "villa",
        "layout" => "large",
        "description" => "A private residential villa designed with clean architectural lines, elegant finishing, and a refined modern exterior.",
        "gallery" => ["villa", "palacePool", "palaceInterior"]
    ],
    [
        "id" => "private-palace-pool",
        "title" => "Private Palace",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "palacePool",
        "layout" => "small",
        "description" => "A luxurious private palace surrounded by elegant outdoor landscaping and classic architectural detailing.",
        "gallery" => ["palacePool", "villa", "majlis"]
    ],
    [
        "id" => "private-palace-interior",
        "title" => "Private Palace",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "palaceInterior",
        "layout" => "small",
        "description" => "A palace interior project featuring rich materials, ornamental details, and a timeless luxury atmosphere.",
        "gallery" => ["palaceInterior", "majlis", "palacePool"]
    ],
    [
        "id" => "hospital",
        "title" => "Hospital",
        "category" => "Hospitality",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "hospital",
        "layout" => "medium",
        "description" => "A hospitality project designed with functionality, durability, and a welcoming visitor experience in mind.",
        "gallery" => ["hospital", "mall", "villa"]
    ],
    [
        "id" => "mall",
        "title" => "Mall",
        "category" => "Commercial",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "mall",
        "layout" => "medium",
        "description" => "A commercial project with a strong architectural presence, refined exterior finishing, and practical circulation.",
        "gallery" => ["mall", "hospital", "villa"]
    ],
    [
        "id" => "private-palace-majlis",
        "title" => "Private Palace",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2024",
        "image" => "majlis",
        "layout" => "wide",
        "description" => "A luxurious majlis interior with bespoke furniture, rich fabrics, and warm decorative detailing.",
        "gallery" => ["majlis", "palaceInterior", "palacePool"]
    ]
];

echo json_encode([
    "success" => true,
    "projects" => $projects
]);
?>