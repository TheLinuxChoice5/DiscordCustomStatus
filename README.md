# Discord Custom Status 

The script will update your custom status with the next animation in the animation array every 5 seconds. If the array is empty, the script will stop.
If the script hits a rate limit while updating your custom status, it will wait for the rate limit to reset before retrying the update. You can disable this behavior by setting the handleRatelimit field in the config.json file to false.

# Requirements 
Node.js (v14 or higher)

A Discord account with a valid user token

# Installation

1. Clone or download this repository to your local machine https://github.com/TheLinuxChoice5/DiscordCustomStatus.git
2. Install the required dependencies by running npm install.
3. Copy the config.example.json file to a new file called config.json.
4. Open the config.json file in a text editor and replace the token field with your Discord user token.
5. Customize the animation array in the config.json file with your own custom status animations. Each animation should be an object with two fields: text (required) and either emojiID or emojiName (optional). The text field specifies the text of the custom status, while the emojiID and emojiName fields specify an emoji to use in the custom status.

# Usage 

node index.js

# Disclaimer

Using automation scripts like this can potentially violate Discord's Terms of Service and can result in account suspension or termination. Use this script at your own risk.
