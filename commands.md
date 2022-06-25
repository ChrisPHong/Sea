- Notes


- Colors for specified HTML Elements
- Color Link:
  - https://icolorpalette.com/download/palette/529827_color_palette.jpg

- One of the Containers for the splash page
  - #064788
  - Make this into a gradient

- Graph Colors and Button Colors
  - #0b7cee



- Front End Routes
  - Create a login and sign up route
    - If a user goes to the sign up page but already has an account then provide a link to the login page and vice versa

- Modals
  - Create a disclaimer modal
  - And the div it'll be a gradient


- Stock Details:
  - The stock details page will contain:
    - the graph will stretch like the theatre mode on youtube aka from width to width to the page with margin
      - the graph is a sticky, and when you scoll down the page, the graph will slide upward
    - the buy will be below the graph and on the right side
    - The about is below the graph on the left side
    -

- **Things to Consider**
  - You can create a demo user based on the demo login and destroy the demo user when they log out. The purpose is to reset the demo user's balance so that they can have enough to buy stocks. Or you can just reset their balance.
    - Also change the user story for the demo user and inform the user that when they use the demo user, they will always be given a set amount and will not save their stocks once they logout.

  - Create a button to add money to the user's balance in order to buy stocks

  - Creating the graphs, we will a create function that will generate the prices for the daily, weekly, to the year


flask db migrate
flask db upgrade
flask seed all

flask db downgrade
