<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$projects = [
    [
        "id" => "private-villa",
        "title" => "Hamra Palace",
        "category" => "Residential",
        "location" => "Jeddah, KSA",
        "year" => "2024",
        "image" => "villa",
        "layout" => "large",
        "description" => "Hamra Palace is a luxury residence in Jeddah, Saudi Arabia.
It features elegant architecture, refined finishes, and a prestigious modern look.
",
        "gallery" => ["hamra2", "hamra3", "hamra4"]
    ],
    [
        "id" => "private-palace-pool",
        "title" => "Spanish Palace",
        "category" => "Residential",
        "location" => "Marbella, Spain",
        "year" => "2010",
        "image" => "spanish1",
        "layout" => "small",
        "description" => "A luxury palace in Spain designed with timeless Mediterranean elegance.
It features grand architecture, refined interiors, and a warm, sophisticated atmosphere.
",
        "gallery" => ["spanish2", "spanish3", "spanish4"]
    ],
    [
        "id" => "private-palace-interior",
        "title" => "Private Palace",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2017",
        "image" => "villa1",
        "layout" => "small",
        "description" => "A palace interior project featuring rich materials, ornamental details, and a timeless luxury atmosphere.",
        "gallery" => ["villa2", "villa3", "villa4"]
    ],
    [
        "id" => "hospital",
        "title" => "Bugshan Hospital",
        "category" => "Hospitality",
        "location" => "Riyadh, KSA",
        "year" => "2001",
        "image" => "hospital",
        "layout" => "medium",
        "description" => "A hospitality project designed with functionality, durability, and a welcoming visitor experience in mind.",
        "gallery" => ["hospital1", "hospital2", "hospital3"]
    ],
    [
        "id" => "mall",
        "title" => "Hotel Cartagena",
        "category" => "Commercial",
        "location" => "Riyadh, KSA",
        "year" => "2018",
        "image" => "res1",
        "layout" => "medium",
        "description" => "A refined restaurant interior designed to create a warm and memorable dining experience.
The space combines elegant finishes, comfortable seating, and a sophisticated atmosphere.",
        "gallery" => ["res2", "res3", "res4"]
    ],
    [
        "id" => "private-palace-majlis",
        "title" => "Private Palace",
        "category" => "Residential",
        "location" => "Riyadh, KSA",
        "year" => "2010",
        "image" => "n1",
        "layout" => "wide",
        "description" => "A luxurious villa designed with elegant architecture, spacious interiors, and a peaceful atmosphere, offering the perfect blend of comfort and sophistication.",
        "gallery" => ["n2", "n3", "n4"]
    ]
];

echo json_encode([
    "success" => true,
    "projects" => $projects
]);
?>