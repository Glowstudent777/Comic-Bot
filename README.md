# Comic Bot
Comic-Bot is a Discord bot developed for sending comics in servers.

Invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=971461458854572062&permissions=139586825280&scope=bot%20applications.commands)

⚠ **Warning: This is currently in development, expect bugs**
  
## Commands:
### Interaction commands:
| Command  | Description |
| --- | --- |
| /garfield  | Sends a random Garfield Comic  |
| /dilbert | Sends a random Dilbert comic |
| /ping  | Displays latency  |

### Prefix commands:
| Command  | Description |
| --- | --- |
| c!garfield  | Sends a random Garfield Comic  |
| c!dilbert | Sends a random Dilbert comic |
| c!ping  | Displays latency  |
| c!credits | Shows bot credits |
| c!checkperms | Check if the bot has the correct permissions |

### Dev commands:
| Command  | Description |
| --- | --- |
| c!resend [guild id]  | Resends the daily comic to the server  |
| c!guild [guild id] | Information about the guild and can resend comics  |

## Setup:
Clone repository using the command below
```
git clone https://github.com/Glowstudent777/Comic-Bot.git
```

Install dependencies using
```
npm install
```

### Secrets and config

Rename `.env.example` to `.env` and fill in the token

In the `config` folder rename `autopost.example` to `autopost.json`. Then open up both `config.js` and `autopost.json` and fill in and edit the information.

To start the bot use `node main.js` or `npm start`

---

### <img src="https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg" width="20" height="20"/> &nbsp;Join my Discord :
[![Join the Cardboard Box](https://inv.wtf/widget/glow)](https://inv.wtf/glow)
