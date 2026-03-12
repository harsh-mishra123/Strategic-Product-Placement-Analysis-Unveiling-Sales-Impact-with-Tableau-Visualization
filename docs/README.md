# Strategic Product Placement Analysis
> Unveiling Sales Impact with Tableau Visualization

## Overview
This project investigates the relationship between product positioning, sales performance, and consumer behavior. Using Tableau and interactive web visualization, it uncovers insights into how different positioning strategies impact sales and consumer preferences.

## Folder Structure
```
DATA_ANALYTICS/
├── data/
│   ├── product_placement_sales.csv    # 140 rows — core sales & placement data
│   ├── consumer_demographics.csv      # 100 rows — consumer profiles & behavior
│   └── placement_effectiveness.csv    # 40 rows  — strategy metrics by scenario
├── docs/
│   └── README.md                      # This file
└── frontend/
    ├── index.html                     # Interactive dashboard
    ├── css/style.css                  # Design system.
    └── js/main.js                     # Charts & interactivity
```

## Datasets

### 1. Product Placement Sales (`product_placement_sales.csv`)
| Column | Description |
|--------|-------------|
| Product_ID | Unique product identifier |
| Product_Name | Product name |
| Category | Beverages, Snacks, Beauty, Electronics |
| Placement_Type | Endcap, Shelf-Eye-Level, Checkout, Window, Online-Banner |
| Store_Region | North, South, East, West |
| Month | Month-Year |
| Units_Sold | Number of units sold |
| Revenue | Total revenue ($) |
| Placement_Cost | Cost of placement ($) |
| ROI | Return on investment |

### 2. Consumer Demographics (`consumer_demographics.csv`)
| Column | Description |
|--------|-------------|
| Consumer_ID | Unique consumer identifier |
| Age_Group | 18-24, 25-34, 35-44, 45-54, 55-64, 65+ |
| Gender | Male, Female, Non-Binary |
| Income_Level | Low, Medium, High |
| Preferred_Category | Most purchased category |
| Purchase_Frequency | Weekly, Bi-Weekly, Monthly |
| Avg_Spend | Average spend per visit ($) |
| Channel | In-Store, Online |
| Loyalty_Member | Yes/No |
| Satisfaction_Score | 1-5 scale |

### 3. Placement Effectiveness (`placement_effectiveness.csv`)
| Column | Description |
|--------|-------------|
| Placement_Strategy | Strategy name |
| Scenario | Film, Retail, Advertising |
| Media_Channel | Specific channel |
| Impressions | Number of views/impressions |
| Engagement_Rate | Percentage engaged |
| Conversion_Rate | Percentage converted to purchase |
| Revenue_Impact | Revenue generated ($) |
| Brand_Recall_Score | Brand recall percentage |

## Scenarios Covered

1. **Film & Television** — Analyze product placement effectiveness in movies & streaming
2. **Retail & Consumer Goods** — Optimize in-store product positioning
3. **Advertising Agencies** — Measure ROI across digital, social, and traditional media

## Using with Tableau

1. Open Tableau Desktop or Tableau Public
2. **Connect to Data** → Select "Text File"
3. Import CSV files from the `data/` folder
4. Create relationships between datasets using common fields
5. Build dashboards using the pre-structured data

### Recommended Tableau Visualizations
- **Bar Chart**: Revenue by Placement Type
- **Heatmap**: ROI across Category × Placement Type
- **Treemap**: Sales distribution by Region and Category
- **Line Chart**: Monthly sales trends by placement strategy
- **Scatter Plot**: Engagement Rate vs. Conversion Rate
- **Donut Chart**: Consumer demographics breakdown

## Running the Frontend Dashboard
```bash
cd frontend
python3 -m http.server 8000
# Open http://localhost:8000
```
