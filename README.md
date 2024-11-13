# Country Comparison Analysis

**Overview**
The Country Comparison Project is a data analysis and visualization tool that explores economic and social indicators across countries, with a focus on metrics such as healthcare expenditure, unemployment rate, and inflation rate over time. This project aims to provide insights into how various global events (e.g., COVID-19, financial crises) have influenced these indicators. The interactive map visualization allows users to explore trends across different years and events.

**Project Structure**

  * country_comparison.ipynb: Main Jupyter Notebook for analyzing country data, calculating percentage changes, and generating insights based on specific events.
  
  * interactive maps:
    * index.html: The main HTML file for the web interface, which includes the interactive map.
    * static: Contains styling and scripting assets for the web interface.
      * css:
        * style.css: Stylesheet for customizing the appearance of the interactive map and interface.
      * js:
        * app.js: JavaScript code that manages the map’s functionality, including dropdown selections and data updates.
       
     * trial_code.txt: A text file that may contain additional code snippets or notes for development reference.
  
  * load_data_to_json.ipynb: A Jupyter Notebook that converts CSV datasets to JSON format, preparing the data for integration with the interactive map.

* Resources: Folder containing raw and processed data files used throughout the project.

  * countries_cleaned_dataset.csv: Cleaned dataset for preliminary analysis.
  * countries_comparisons_sql.csv: Dataset with SQL-comparable data for additional insights.
  * country_comparison_large_dataset.csv: The primary dataset containing various economic and social indicators for multiple countries.
  * growth_data_sql.csv: Additional dataset for analyzing growth metrics.
  * growth_rate_df.csv: Contains growth rate calculations for economic indicators.
  * json_data.json: JSON file used in the web interface to provide structured data for visualizations.
  * percentages_data.json: Contains percentage change data for key events, which is loaded into the web visualization.

**How to Use and Interact with the Project** 
#### 1. Data Processing:
  
  * Use country_comparison.ipynb to clean, analyze, and calculate percentage changes in economic indicators.
  * Convert data to JSON format using load_data_to_json.ipynb, creating json_data.json and percentages_data.json for integration with the web interface.
    
#### 2. Web Application:

* Open interactive maps/index.html in a web browser to access the interactive visualization.
* Use dropdown menus to select statistics (e.g., GDP, inflation rate) and years. The map will display countries with colors representing the selected indicator, allowing users to explore trends interactively.

**Ethical Considerations**

The project uses only publicly available, aggregated data, ensuring privacy and ethical compliance by avoiding individual or sensitive data. It aims to provide an unbiased analysis of global economic trends without implying any specific political or personal stance. Visualizations are intended for educational and analytical purposes only.

**Data Sources**

* Primary datasets in the Resources folder, such as country_comparison_large_dataset.csv, are sourced from reliable, publicly available economic and health databases.
* GeoJSON Data: The map boundaries are based on GeoJSON data sourced from reputable public sources.

**Code References**

* Leaflet.js: Used for interactive map rendering and geospatial data handling in app.js.
* D3.js: Employed for color scaling and dynamic data binding.
* Bootstrap: Used in index.html for layout and UI components in the web interface.

**References**
* Ali, W. (2024, September 10). Country comparison dataset (USA & more) . Kaggle. https://www.kaggle.com/datasets/waqi786/country-comparison-dataset-usa-and-more/data 
* Haberkorn, F., Hoang, T., Lewis, G., Mix, C., & Moore, D. (2024, December 4). Global trade patterns in the wake of the 2018-2019 u.s.-china tariff hikes. The Fed - Global trade patterns in the wake of the 2018-2019 U.S.-China tariff hikes. https://www.federalreserve.gov/econres/notes/feds-notes/global-trade-patterns-in-the-wake-of-the-2018-2019-u-s-china-tariff-hikes-20240412.html#:~:text=In%202018%2C%20the%20U.S.%20government,were%20subject%20to%20additional%20tariffs. 
* Ray, M. (2024, October 10). Euro-zone debt crisis. Encyclopædia Britannica. https://www.britannica.com/topic/euro-zone-debt-crisis 
* Roser, M. (2024, March 25). Our world in data. Our World in Data. https://ourworldindata.org/
* Sun, M., Yan, S., Cao, T., & Zhang, J. (2024). The impact of covid-19 pandemic on the world’s major economies: Based on a multi-country and multi-sector CGE model. Frontiers in Public Health, 12. https://doi.org/10.3389/fpubh.2024.1338677 
* United Nations. (2020). ECONOMIC AND SOCIAL CHALLENGES AND OPPORTUNITIES. https://www.un.org/development/desa/en/wp-content/uploads/2020/07/RECOVER_BETTER_0722-1.pdf 
* WHO. (n.d.). Ebola outbreak 2014-2016 - West Africa. World Health Organization. https://www.who.int/emergencies/situations/ebola-outbreak-2014-2016-West-Africa
* WHO. (2020). Coronavirus disease (covid-19) pandemic. World Health Organization. https://www.who.int/europe/emergencies/situations/covid-19 Yardi, S. (2024, July 18). Home Healthcare Statistics 2024 by Utilization, diagnoses. Market.us Media. https://media.market.us/home-healthcare-statistics/
* World Economic Forum. (2020, January). The Global Social Mobility Report 2020 Equality, Opportunity and a New Economic Imperative . The World Economic Forum. https://www3.weforum.org/docs/Global_Social_Mobility_Report.pdf 

ChatGPT was used for README outline and format, and troubleshooting errors for this project assignment.

* OpenAI. (November, 2024). ChatGPT (GPT-4) [Large language model]. https://chat.openai.com/
Xpert Learning Assistant was used for troubleshooting errors for this project assignment.

* Xpert Learning Assistant. (2024). Retrieved from https://bootcampspot.instructure.com/
