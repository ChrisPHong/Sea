from app.models import db, Company

def seed_companies():

    company1 = Company(
        name="Apple Inc",
        ticker="AAPL",
        description="Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services headquartered in Cupertino, California, United States.",
        ceo="Tim Cook",
        employees=154000,
        headquarters="Cupertino, CA",
        founded=1976,
        base_price=141.81
    )
    company2 = Company(
        name="Microsoft Corporation",
        ticker="MSFT",
        description="Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.",
        ceo="Satya Nadella",
        employees=181000,
        headquarters="Redmond, WA",
        founded=1975,
        base_price=267.98
    )
    company3 = Company(
        name="Amazon.com, Inc.",
        ticker="AMZN",
        description="Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It has been referred to as 'one of the most influential economic and cultural forces in the world', and is one of the world's most valuable brands.",
        ceo="Andy Jassy",
        employees=1608000,
        headquarters="Seattle, WA",
        founded=1994,
        base_price=116.69
    )
    company4 = Company(
        name="Alphabet Inc Class A",
        ticker="GOOGL",
        description="Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries.",
        ceo="Sundar Pichai",
        employees=163906,
        headquarters="Mountain View, CA",
        founded=2015,
        base_price=2360.24
    )
    company5 = Company(
        name="Alphabet Inc Class C",
        ticker="GOOG",
        description="Alphabet Inc. is an American multinational technology conglomerate holding company headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries.",
        ceo="Sundar Pichai",
        employees=163906,
        headquarters="Mountain View, CA",
        founded=2015,
        base_price=2371.60
    )
    company6 = Company(
        name="Tesla Inc",
        ticker="TSLA",
        description="Tesla, Inc. is an American automotive and clean energy company based in Austin, Texas. Tesla designs and manufactures electric vehicles, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services.",
        ceo="Elon Musk",
        employees=99290,
        headquarters="Austin, TX",
        founded=2003,
        base_price=736.89
    )
    company7 = Company(
        name="Berkshire Hathaway Inc. Class B",
        ticker="BRK.B",
        description="Berkshire Hathaway Inc. is an American multinational conglomerate holding company headquartered in Omaha, Nebraska, United States.",
        ceo="Warren Buffett",
        employees=372000,
        headquarters="Omaha, NE",
        founded=1839,
        base_price=278.56
    )
    company8 = Company(
        name="Johnson & Johnson",
        ticker="JNJ",
        description="At Johnson & Johnson, we believe good health is the foundation of vibrant lives, thriving communities and forward progress. That’s why for more than 130 years, we have aimed to keep people well at every age and every stage of life. Today, as the world’s largest and most broadly based healthcare company, we are committed to using our reach and size for good. We strive to improve access and affordability, create healthier communities, and put a healthy mind, body and environment within reach of everyone, everywhere.",
        ceo="Joaquin Duato",
        employees=141700,
        headquarters="New Brunswick, NJ",
        founded=1886,
        base_price=182.50
    )
    company9 = Company(
        name="UnitedHealth Group Inc",
        ticker="UNH",
        description="UnitedHealth Group Incorporated is an American multinational managed healthcare and insurance company based in Minnetonka, Minnesota. It offers health care products and insurance services.",
        ceo="Andrew Witty",
        employees=350000,
        headquarters="Minnetonka, MN",
        founded=1977,
        base_price=496.21
    )
    company10 = Company(
        name="NVIDIA Corporation",
        ticker="NVDA",
        description="Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California.",
        ceo="Jensen Huang",
        employees=22473,
        headquarters="Santa Clara, CA",
        founded=1993,
        base_price=171.38
    )
    company11 = Company(
        name='Exxon Mobil Corp',
        ticker='XOM',
        description="Exxon Mobil Corporation, stylized as ExxonMobil, is an American multinational oil and gas corporation headquartered in Irving, Texas. It is the largest direct descendant of John D. Rockefeller's Standard Oil, and was formed on November 30, 1999, by the merger of Exxon and Mobil. ExxonMobil's primary brands are Exxon, Mobil, Esso, and ExxonMobil Chemical, which produces plastic, synthetic rubber, and other chemical products. ExxonMobil is incorporated in New Jersey. One of the world's largest companies by revenue, ExxonMobil from 1996 to 2017 varied from the first to sixth largest publicly traded company by market capitalization. The company was ranked third globally in the Forbes Global 2000 list in 2016. ExxonMobil was the tenth most profitable company in the Fortune 500 in 2017. As of 2018, the company ranked second in the Fortune 500 rankings of the largest United States corporations by total revenue. Approximately 55.56% of the company's shares are held by institutions. As of March 2019, ExxonMobil's largest shareholders include The Vanguard Group, BlackRock, and State Street Corporation. ExxonMobil is one of the largest of the world's Big Oil companies.",
        ceo='Darren Woods',
        employees=63000,
        headquarters='Irving, TX',
        founded=1999,
        base_price=86.95
    )
    company12 = Company(
        name='Meta Platforms, Inc',
        ticker='META',
        description="Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, wearables, and in-home devices worldwide. It operates in two segments, Family of Apps and Reality Labs. The Family of Apps segment's products include Facebook, which enables people to share, discover, and connect with interests; Instagram, a community for sharing photos, videos, and private messages, as well as feed, stories, reels, video, live, and shops; Messenger, a messaging application for people to connect with friends, family, groups, and businesses across platforms and devices through chat, audio and video calls, and rooms; and WhatsApp, a messaging application that is used by people and businesses to communicate and transact privately. The Reality Labs segment provides augmented and virtual reality related products comprising virtual reality hardware, software, and content that help people feel connected, anytime, and anywhere. The company was formerly known as Facebook, Inc. and changed its name to Meta Platforms, Inc. in October 2021. Meta Platforms, Inc. was incorporated in 2004 and is headquartered in Menlo Park, California.",
        ceo='Mark Zuckerberg',
        employees=77805,
        headquarters='Menlo Park, CA',
        founded=2004,
        base_price=170.16
    )
    company13 = Company(
        name='JPMorgan Chase & Co.',
        ticker='JPM',
        description="JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company headquartered in New York City and incorporated in Delaware. As of March 31, 2022, JPMorgan Chase is the largest bank in the United States, the world's largest bank by market capitalization, and the fifth largest bank in the world in terms of total assets, with total assets of US$3.954 trillion. As a 'Bulge Bracket' bank, it is a major provider of various investment banking and financial services. It is one of America's Big Four banks, along with Bank of America, Citigroup, and Wells Fargo. JPMorgan Chase is considered to be a universal bank and a custodian bank. The J.P. Morgan brand is used by the investment banking, asset management, private banking, private wealth management, and treasury services divisions. Fiduciary activity within private banking and private wealth management is done under the aegis of JPMorgan Chase Bank, N.A.—the actual trustee. The Chase brand is used for credit card services in the United States and Canada, the bank's retail banking activities in the United States and United Kingdom, and commercial banking.",
        ceo='Jamie Dimon',
        employees=273948,
        headquarters='New York, NY',
        founded=2000,
        base_price=117.32
    )
    company14 = Company(
        name='Procter & Gamble Company',
        ticker='PG',
        description="The Procter & Gamble Company is an American multinational consumer goods corporation headquartered in Cincinnati, Ohio, founded in 1837 by William Procter and James Gamble. It specializes in a wide range of personal health/consumer health, and personal care and hygiene products; these products are organized into several segments including beauty; grooming; health care; fabric & home care; and baby, feminine, & family care. Before the sale of Pringles to Kellogg's, its product portfolio also included food, snacks, and beverages. P&G is incorporated in Ohio. In 2014, P&G recorded $83.1 billion in sales. On August 1, 2014, P&G announced it was streamlining the company, dropping and selling off around 100 brands from its product portfolio in order to focus on the remaining 65 brands, which produced 95% of the company's profits. A.G. Lafley—the company's chairman, and CEO until October 31, 2015—said the future P&G would be 'a much simpler, much less complex company of leading brands that's easier to manage and operate'. Jon Moeller is the current president and CEO of P&G.",
        ceo='Jon R. Moeller',
        employees=101000,
        headquarters='Cincinnati, OH',
        founded=1837,
        base_price=144.38
    )
    company15 = Company(
        name='Visa Inc. Class A',
        ticker='V',
        description="Visa Inc. is an American multinational financial services corporation headquartered in Foster City, California, United States. It facilitates electronic funds transfers throughout the world, most commonly through Visa-branded credit cards, debit cards and prepaid cards. Visa is one of the world's most valuable companies. Visa does not issue cards, extend credit or set rates and fees for consumers; rather, Visa provides financial institutions with Visa-branded payment products that they then use to offer credit, debit, prepaid and cash access programs to their customers. In 2015, the Nilson Report, a publication that tracks the credit card industry, found that Visa's global network processed 100 billion transactions during 2014 with a total volume of US$6.8 trillion. It was launched in September 1958 by Bank of America as the BankAmericard credit card program. In response to competitor Master Charge, BofA began to license the BankAmericard program to other financial institutions in 1966. By 1970, BofA gave up direct control of the BankAmericard program, forming a consortium with the other various BankAmericard issuer banks to take over its management.",
        ceo='Alfred F Kelly Jr',
        employees=21500,
        headquarters='San Francisco, CA',
        founded=1958,
        base_price=205.47
    )
    company16 = Company(
        name='Chevron Corporation',
        ticker='CVX',
        description="Chevron Corporation is an American multinational energy corporation. One of the successor companies of Standard Oil, it is headquartered in San Ramon, California, and active in more than 180 countries. Chevron is engaged in every aspect of the oil and natural gas industries, including hydrocarbon exploration and production; refining, marketing and transport; chemicals manufacturing and sales; and power generation. It was also one of the Seven Sisters that dominated the global petroleum industry from the mid-1940s to the 1970s. Chevron is one of the largest companies in the world and the second largest oil company in the United States, only behind ExxonMobil. As of August 2021, Chevron ranked 27th in the Fortune 500 with a yearly revenue of $94.7 billion and market valuation of $190 billion. In the 2020 Forbes Global 2000, Chevron was ranked as the 61st-largest public company in the world. Chevron's downstream operations manufacture and sell products such as fuels, lubricants, additives, and petrochemicals. The company's most significant areas of operations are the west coast of North America, the U.S. Gulf Coast, Southeast Asia, South Korea and Australia.",
        ceo='Michael Wirth',
        employees=42595,
        headquarters='San Ramon, CA',
        founded=1879,
        base_price=144.87
    )
    company17 = Company(
        name='Home Depot Inc.',
        ticker='HD',
        description='The Home Depot, Inc. is an American multinational home improvement retail corporation that sells tools, construction products, appliances, and services. Home Depot is the largest home improvement retailer in the United States. In 2021, the company had 490,600 employees and more than $151 billion in revenue. The company is headquartered in incorporated Cobb County, Georgia, with an Atlanta mailing address. It operates many big-box format stores across the United States; all 10 provinces of Canada; and all 32 Mexican states and Mexico City. MRO company Interline Brands is also owned by The Home Depot, with 70 distribution centers across the United States.',
        ceo='Edward Decker',
        employees=490600,
        headquarters='Atlanta, GA',
        founded=1978,
        base_price=282.88
    )
    company18 = Company(
        name='Pfizer Inc.',
        ticker='PFE',
        description="Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation headquartered on 42nd Street in Manhattan, New York City. The company was established in 1849 in New York by two German immigrants, Charles Pfizer and his cousin Charles F. Erhart. Pfizer develops and produces medicines and vaccines for immunology, oncology, cardiology, endocrinology, and neurology. The company has several blockbuster drugs or products that each generate more than US$1 billion in annual revenues. In 2020, 52% of the company's revenues came from the United States, 6% came from each of China and Japan, and 36% came from other countries. Pfizer was a component of the Dow Jones Industrial Average stock market index from 2004 to August 2020. The company ranks 64th on the Fortune 500 and 49th on the Forbes Global 2000.",
        ceo='Albert Bourla',
        employees=79000,
        headquarters='New York, NY',
        founded=1849,
        base_price=51.60
    )
    company19 = Company(
        name='Mastercard Incorporated Class A',
        ticker='MA',
        description="Mastercard Inc. is an American multinational financial services corporation headquartered in the Mastercard International Global Headquarters in Purchase, New York. The Global Operations Headquarters is located in O'Fallon, Missouri, a municipality of St. Charles County, Missouri. Throughout the world, its principal business is to process payments between the banks of merchants and the card-issuing banks or credit unions of the purchasers who use the 'Mastercard' brand debit, credit and prepaid cards to make purchases. Mastercard Worldwide has been a publicly traded company since 2006. Prior to its initial public offering, Mastercard Worldwide was a cooperative owned by the more than 25,000 financial institutions that issue its branded cards. Mastercard, originally known as Interbank from 1966 to 1969 and Master Charge from 1969 to 1979, was created by an alliance of several regional bankcard associations in response to the BankAmericard issued by Bank of America, which later became the Visa credit card issued by Visa Inc.",
        ceo='Michael Miebach',
        employees=24000,
        headquarters='Purchase, NY',
        founded=1966,
        base_price=330.61
    )
    company20 = Company(
        name='AbbVie Inc.',
        ticker='ABBV',
        description="AbbVie Inc. discovers, develops, manufactures, and sells pharmaceuticals in the worldwide. The company offers HUMIRA, a therapy administered as an injection for autoimmune and intestinal Behçet's diseases; SKYRIZI to treat moderate to severe plaque psoriasis in adults; RINVOQ, a JAK inhibitor for the treatment of moderate to severe active rheumatoid arthritis in adult patients; IMBRUVICA to treat adult patients with chronic lymphocytic leukemia (CLL), small lymphocytic lymphoma (SLL), and VENCLEXTA, a BCL-2 inhibitor used to treat adults with CLL or SLL; and MAVYRET to treat patients with chronic HCV genotype 1-6 infection. It also provides CREON, a pancreatic enzyme therapy for exocrine pancreatic insufficiency; Synthroid used in the treatment of hypothyroidism; Linzess/Constella to treat irritable bowel syndrome with constipation and chronic idiopathic constipation; Lupron for the palliative treatment of advanced prostate cancer, endometriosis and central precocious puberty, and patients with anemia caused by uterine fibroids; and Botox therapeutic. In addition, the company offers ORILISSA, a nonpeptide small molecule gonadotropin-releasing hormone antagonist for women with moderate to severe endometriosis pain; Duopa and Duodopa, a levodopa-carbidopa intestinal gel to treat Parkinson's disease; Lumigan/Ganfort, a bimatoprost ophthalmic solution for the reduction of elevated intraocular pressure (IOP) in patients with open angle glaucoma (OAG) or ocular hypertension; Ubrelvy to treat migraine with or without aura in adults; Alphagan/ Combigan, an alpha-adrenergic receptor agonist for the reduction of IOP in patients with OAG; and Restasis, a calcineurin inhibitor immunosuppressant to increase tear production, as well as other eye care products. AbbVie Inc. has a research collaboration with Dragonfly Therapeutics, Inc. The company was incorporated in 2012 and is headquartered in North Chicago, Illinois.",
        ceo='Richard A. Gonzalez',
        employees=50000,
        headquarters='North Chicago, IL',
        founded=2013,
        base_price=152.48
    )
    company21 = Company(
        name="Eli Lilly and Company",
        ticker="LLY",
        description="Lilly is a global health care leader that unites caring with discovery to create medicines that make life better for people around the world. It was founded more than a century ago by a man committed to creating high-quality medicines that meet real needs, and today it remains true to that mission in all its work. Across the globe, Lilly employees work to discover and bring life-changing medicines to those who need them, improve the understanding and management of disease, and give back to communities through philanthropy and volunteerism.",
        ceo="David Ricks",
        employees=2020,
        headquarters="Indianapolis, IN",
        founded=1876,
        base_price=325.75
    )
    company22 = Company(
        name="Coca-Cola Company",
        ticker="KO",
        description="The Coca-Cola Company is a total beverage company with products sold in more than 200 countries and territories. The company’s purpose is to refresh the world and make a difference. The Company's portfolio of brands includes Coca-Cola, Sprite, Fanta and other sparkling soft drinks. The Company's hydration, sports, coffee and tea brands include Dasani, smartwater, vitaminwater, Topo Chico, Powerade, Costa, Georgia, Gold Peak, Honest and Ayataka. The Company's nutrition, juice, dairy and plant-based beverage brands include Minute Maid, Simply, innocent, Del Valle, fairlife and AdeS. The Company's constantly transforming our portfolio, from reducing sugar in our drinks to bringing innovative new products to market. The Company seeks to positively impact people’s lives, communities and the planet through water replenishment, packaging recycling, sustainable sourcing practices and carbon emissions reductions across our value chain. Together with our bottling partners, we employ more than 700,000 people, helping bring economic opportunity to local communities worldwide.",
        ceo="Muhtar Kent",
        employees=80300,
        headquarters="Atlanta, GA",
        founded=1892,
        base_price=63.05
    )
    company23 = Company(
        name="Bank of America Corp",
        ticker="BAC",
        description="Bank of America is one of the world’s leading financial institutions, serving individual consumers, small and middle-market businesses and large corporations with a full range of banking, investing, asset management and other financial and risk management products and services. The company provides unmatched convenience in the United States, serving approximately 66 million consumer and small business clients with approximately 4,300 retail financial centers, including approximately 2,900 lending centers, 2,500 financial centers with a Consumer Investment Financial Solutions Advisor and approximately 2,300 business centers; approximately 17,000 ATMs; and award-winning digital banking with approximately 39 million active users, including approximately 31 million mobile users. Bank of America is a global leader in wealth management, corporate and investment banking and trading across a broad range of asset classes, serving corporations, governments, institutions and individuals around the world. Bank of America offers industry-leading support to approximately 3 million small business owners through a suite of innovative, easy-to-use online products and services. The company serves clients through operations across the United States, its territories and approximately 35 countries. Bank of America Corporation stock (NYSE: BAC) is listed on the New York Stock Exchange.",
        ceo="Brian Moynihan",
        employees=213000,
        headquarters="Charlotte, NC",
        founded=1998,
        base_price=32.33
    )
    company24 = Company(
        name="Merck & Co. Inc.",
        ticker="MRK",
        description="For 130 years, Merck, known as MSD outside of the United States and Canada, has been inventing for life, bringing forward medicines and vaccines for many of the world's most challenging diseases in pursuit of its mission to save and improve lives. It demonstrates its commitment to patients and population health by increasing access to health care through far-reaching policies, programs and partnerships. Today, Merck continues to be at the forefront of research to prevent and treat diseases that threaten people and animals - including cancer, infectious diseases such as HIV and Ebola, and emerging animal diseases - as we aspire to be the premier research-intensive biopharmaceutical company in the world.",
        ceo="Kenneth Frazier",
        employees=2021,
        headquarters="Whitehouse Station, Readington Township, NJ",
        founded=1891,
        base_price=93.22
    )
    company25 = Company(
        name="PepsiCo Inc.",
        ticker="PEP",
        description="PepsiCo products are enjoyed by consumers more than one billion times a day in more than 200 countries and territories around the world. PepsiCo generated more than $67 billion in net revenue in 2019, driven by a complementary food and beverage portfolio that includes Frito-Lay, Gatorade, Pepsi-Cola, Quaker and Tropicana. PepsiCo's product portfolio includes a wide range of enjoyable foods and beverages, including 23 brands that generate more than $1 billion each in estimated annual retail sales. Guiding PepsiCo is our vision to Be the Global Leader in Convenient Foods and Beverages by Winning with Purpose. 'Winning with Purpose' reflects our ambition to win sustainably in the marketplace and embed purpose into all aspects of the business.",
        ceo="Ramon Laguarta",
        employees=2020,
        headquarters="Purchase, Harrison, NY",
        founded=1965,
        base_price=166.15
    )
    company26 = Company(
        name="Verizon Communications Inc.",
        ticker="VZ",
        description="Verizon is one of the largest communication technology companies in the world. Verizon Communications Inc. was formed on June 30, 2000 and is celebrating its 20th year as one of the world’s leading providers of technology, communications, information and entertainment products and services. Headquartered in New York City and with a presence around the world, Verizon generated revenues of $128.3 billion in 2020. The company offers voice, data and video services and solutions on its award winning networks and platforms, delivering on customers’ demand for mobility, reliable network connectivity, security and control.",
        ceo="Hans Vestberg",
        employees=132200,
        headquarters="New York, NY",
        founded=1983,
        base_price=50.97
    )
    company27 = Company(
        name="Costco Wholesale Corporation",
        ticker="COST",
        description="Costco Wholesale Corporation is an American multinational corporation which operates a chain of membership-only big-box retail stores. As of 2020, Costco was the fifth largest retailer in the world, and the world's largest retailer of choice and prime beef, organic foods, rotisserie chicken, and wine as of 2016. In 2021, Costco was ranked #10 on the Fortune 500 rankings of the largest United States corporations by total revenue. Costco's worldwide headquarters are in Issaquah, Washington, an eastern suburb of Seattle, although its Kirkland Signature house label bears the name of its former location in Kirkland. The company opened its first warehouse in Seattle in 1983. Through mergers, however, Costco's corporate history dates back to 1976, when its former competitor Price Club was founded in San Diego, California. As of March 2022, Costco has 831 warehouses worldwide: 574 in the United States, 105 in Canada, 40 in Mexico, 31 in Japan, 29 in the United Kingdom, 16 in South Korea, 14 in Taiwan, 13 in Australia, four in Spain, two each in France and China, and one in Iceland. Costco regularly opens new locations",
        ceo="W. Craig Jelinek",
        employees=288000,
        headquarters="Issaquah, WA",
        founded=1976,
        base_price=484.63
    )
    company28 = Company(
        name="Thermo Fisher Scientific Inc.",
        ticker="TMO",
        description="Thermo Fisher Scientific Inc. is the world leader in serving science, with annual revenue exceeding $25 billion. Its Mission is to enable our customers to make the world healthier, cleaner and safer. Whether the customers are accelerating life sciences research, solving complex analytical challenges, improving patient diagnostics and therapies or increasing productivity in their laboratories, the company is here to support them. Its global team of more than 75,000 colleagues delivers an unrivaled combination of innovative technologies, purchasing convenience and pharmaceutical services through our industry-leading brands, including Thermo Scientific, Applied Biosystems, Invitrogen, Fisher Scientific, Unity Lab Services and Patheon.",
        ceo="Marc N. Casper",
        employees=13000,
        headquarters="Waltham, MA",
        founded=1956,
        base_price=545.10
    )
    company29 = Company(
        name="Broadcom Inc.",
        ticker="AVGO",
        description="Broadcom Inc., a Delaware corporation headquartered in San Jose, CA, is a global technology leader that designs, develops and supplies a broad range of semiconductor and infrastructure software solutions. Broadcom's category-leading product portfolio serves critical markets including data center, networking, enterprise software, broadband, wireless, storage and industrial. Broadcom Inc solutions include data center networking and storage, enterprise, mainframe and cyber security software focused on automation, monitoring and security, smartphone components, telecoms and factory automation.",
        ceo="Hock Tan",
        employees=2020,
        headquarters="San Jose, CA",
        founded=1961,
        base_price=509.27
    )
    company30 = Company(
        name="Fortinet Inc.",
        ticker="FTNT",
        description="Fortinet secures the largest enterprise, service provider, and government organizations around the world. Fortinet empowers its customers with complete visibility and control across the expanding attack surface and the power to take on ever-increasing performance requirements today and into the future. Only the Fortinet Security Fabric platform can address the most critical security challenges and protect data across the entire digital infrastructure, whether in networked, application, multi-cloud or edge environments. Fortinet ranks #1 in the most security appliances shipped worldwide and more than 500,000 customers trust Fortinet to protect their businesses. Both a technology company and a learning organization, the Fortinet Network Security Expert (NSE) Training Institute has one of the largest and broadest cybersecurity training programs in the industry.",
        ceo="Ken Xie",
        employees=8238,
        headquarters="Sunnyvale, CA",
        founded=2000,
        base_price=59.17
    )
    company31 = Company(
        name="Abbott Laboratories",
        ticker="ABT",
        description="Abbott is a global healthcare leader that helps people live more fully at all stages of life. Its portfolio of life-changing technologies spans the spectrum of healthcare, with leading businesses and products in diagnostics, medical devices, nutritionals and branded generic medicines. Our 109,000 colleagues serve people in more than 160 countries.",
        ceo="Robert Ford",
        employees=109000,
        headquarters="Abbott Park, IL",
        founded=1888,
        base_price=109.39
    )
    company32 = Company(
        name="Accenture Plc Class A",
        ticker="ACN",
        description="Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, it offers Strategy and Consulting, Interactive, Technology and Operations services - all powered by the world's largest network of Advanced Technology and Intelligent Operations centers. Its 514,000 people deliver on the promise of technology and human ingenuity every day, serving clients in more than 120 countries. It embraces the power of change to create value and shared success for its clients, people, shareholders, partners and communities.",
        ceo="Julie Sweet",
        employees=506000,
        headquarters="Dublin, IRE",
        founded=1989,
        base_price=299.57
    )
    company33 = Company(
        name="Cisco Systems Inc.",
        ticker="CSCO",
        description="Cisco is the worldwide leader in technology that powers the Internet. Cisco inspires new possibilities by reimagining your applications, securing your data, transforming your infrastructure, and empowering your teams for a global and inclusive future.",
        ceo="Chuck Robbins",
        employees=77500,
        headquarters="San Jose, CA",
        founded=1984,
        base_price=44.10
    )
    company34 = Company(
        name="McDonald`s Corp",
        ticker="MCD",
        description="McDonald's is the world's leading global foodservice retailer with over 39,000 locations in over 100 countries. Approximately 93% of McDonald's restaurants worldwide are owned and operated by independent local business owners.",
        ceo="Christopher Kempczinski",
        employees=200000,
        headquarters="Chicago, IL",
        founded=1955,
        base_price=247.92
    )
    company35 = Company(
        name="Comcast Corporation Class A",
        ticker="CMCSA",
        description= "Comcast Corporation is an American multinational telecommunications conglomerate headquartered in Philadelphia, Pennsylvania. It is the second-largest broadcasting and cable television company in the world by revenue, the largest pay-TV company, the largest cable TV company and largest home Internet service provider in the United States, and the nation's third-largest home telephone service provider. It provides services to U.S. residential and commercial customers in 40 states and the District of Columbia. As the parent company of the international media company NBCUniversal since 2011, Comcast is a producer of feature films for theatrical exhibition, and over-the-air and cable television programming. Comcast owns and operates the Xfinity residential cable communications subsidiary, Comcast Business, a commercial services provider; Xfinity Mobile, an MVNO of Verizon; over-the-air national broadcast network channels; multiple cable-only channels; the film studio Universal Pictures; the VOD streaming service Peacock; animation studios and Universal Parks & Resorts.",
        ceo= "Brian L. Roberts",
        employees=189000,
        headquarters="Philadelphia, PA",
        founded=1963,
        base_price=39.60
    )
    company36 = Company(
        name="Adobe Incorporated",
        ticker="ADBE",
        description="Adobe Inc., originally called Adobe Systems Incorporated, is an American multinational computer software company incorporated in Delaware and headquartered in San Jose, California. It has historically specialized in software for the creation and publication of a wide range of content, including graphics, photography, illustration, animation, multimedia/video, motion pictures, and print. Its flagship products include Adobe Photoshop image editing software; Adobe Illustrator vector-based illustration software; Adobe Acrobat Reader and the Portable Document Format; and a host of tools primarily for audio-visual content creation, editing and publishing. Adobe offered a bundled solution of its products named Adobe Creative Suite, which evolved into a subscription software as a service offering named Adobe Creative Cloud. The company also expanded into digital marketing software and in 2021 was considered one of the top global leaders in Customer Experience Management. Adobe was founded in December 1982 by John Warnock and Charles Geschke, who established the company after leaving Xerox PARC to develop and sell the PostScript page description language",
        ceo="Shantanu Narayen",
        employees=25988,
        headquarters="San Jose, CA",
        founded=1982,
        base_price=388.01
    )
    company37 = Company(
        name="Walt Disney Company",
        ticker="DIS",
        description="The Walt Disney Company, commonly known as Disney, is an American multinational mass media and entertainment conglomerate headquartered at the Walt Disney Studios complex in Burbank, California. Disney was originally founded on October 16, 1923, by brothers Walt and Roy O. Disney as the Disney Brothers Cartoon Studio; it also operated under the names the Walt Disney Studio and Walt Disney Productions before changing its name to the Walt Disney Company in 1986. The company established itself as a leader in the American animation industry before diversifying into live-action film production, television, and theme parks. Since the 1980s, Disney has created and acquired corporate divisions in order to market more mature content than is typically associated with its flagship family-oriented brands. The company is known for its film studio division, Walt Disney Studios, which includes Walt Disney Pictures, Walt Disney Animation Studios, Pixar, Marvel Studios, Lucasfilm, 20th Century Studios, 20th Century Animation, and Searchlight Pictures.",
        ceo="Bob Chapek",
        employees=166250,
        headquarters="Burbank, CA",
        founded=1923,
        base_price=97.81
    )
    company38 = Company(
        name="Walmart Inc.",
        ticker="WMT",
        description="Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores from the United States, headquartered in Bentonville, Arkansas. The company was founded by Sam Walton in nearby Rogers, Arkansas in 1962 and incorporated under Delaware General Corporation Law on October 31, 1969. It also owns and operates Sam's Club retail warehouses. As of April 30, 2022, Walmart has 10,585 stores and clubs in 24 countries, operating under 46 different names. The company operates under the name Walmart in the United States and Canada, as Walmart de México y Centroamérica in Mexico and Central America, and as Flipkart Wholesale in India. It has wholly owned operations in Chile, Canada, and South Africa. Since August 2018, Walmart held only a minority stake in Walmart Brasil, which was renamed Grupo Big in August 2019, with 20 percent of the company's shares, and private equity firm Advent International holding 80 percent ownership of the company. They, eventually, divested their shareholdings in Grupo Big to French retailer Carrefour, in transaction worth R$7 billion and completed on June 7, 2022.",
        ceo="Doug McMillon",
        employees=2300000,
        headquarters="Bentonville, AR",
        founded=1962,
        base_price=123.73
    )
    company39 = Company(
        name="Salesforce Inc.",
        ticker="CRM",
        description="Salesforce, Inc. is an American cloud-based software company headquartered in San Francisco, California. It provides customer relationship management software and applications focused on sales, customer service, marketing automation, analytics, and application development.",
        ceo="Marc Benioff",
        employees=73541,
        headquarters="San Francisco, CA",
        founded=1999,
        base_price=186.07
    )
    company40 = Company(
        name="Bristol-Myers Squibb Company",
        ticker="BMY",
        description="The Bristol-Myers Squibb Company is an American multinational pharmaceutical company. Headquartered in New York City, BMS is one of the world's largest pharmaceutical companies and consistently ranks on the Fortune 500 list of the largest U.S. corporations. For fiscal 2021, it had a total revenue of $46.4 billion. Bristol Myers Squibb manufactures prescription pharmaceuticals and biologics in several therapeutic areas, including cancer, HIV/AIDS, cardiovascular disease, diabetes, hepatitis, rheumatoid arthritis, and psychiatric disorders. BMS's primary research and development sites are located in Lawrence, New Jersey, Summit, New Jersey, formerly HQ of Celgene, New Brunswick, New Jersey, Redwood City, California, and Seville in Spain, with other sites in Devens and Cambridge, Massachusetts, East Syracuse, New York, Braine-l'Alleud, Belgium, Tokyo, Japan, Bangalore, India, and Wirral, United Kingdom. BMS previously had an R&D site in Wallingford, Connecticut.",
        ceo="Giovanni Caforio",
        employees=32200,
        headquarters="New York, NY",
        founded=1887,
        base_price=78.99
    )

    db.session.add(company1)
    db.session.add(company2)
    db.session.add(company3)
    db.session.add(company4)
    db.session.add(company5)
    db.session.add(company6)
    db.session.add(company7)
    db.session.add(company8)
    db.session.add(company9)
    db.session.add(company10)
    db.session.add(company11)
    db.session.add(company12)
    db.session.add(company13)
    db.session.add(company14)
    db.session.add(company15)
    db.session.add(company16)
    db.session.add(company17)
    db.session.add(company18)
    db.session.add(company19)
    db.session.add(company20)
    db.session.add(company21)
    db.session.add(company22)
    db.session.add(company23)
    db.session.add(company24)
    db.session.add(company25)
    db.session.add(company26)
    db.session.add(company27)
    db.session.add(company28)
    db.session.add(company29)
    db.session.add(company30)
    db.session.add(company31)
    db.session.add(company32)
    db.session.add(company33)
    db.session.add(company34)
    db.session.add(company35)
    db.session.add(company36)
    db.session.add(company37)
    db.session.add(company38)
    db.session.add(company39)
    db.session.add(company40)

    db.session.commit()

def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
