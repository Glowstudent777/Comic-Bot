# Comic Bot
Comic-Bot is a Discord bot developed for sending comics in servers.

Invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=971461458854572062&permissions=139586825280&scope=bot%20applications.commands)
  
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

Rename `.env.example` to `.env` and fill in the token

In the `config` folder `config.example` and `autopost.example` should be renamed to `config.json` and `autopost.json` respectively. Then fill in the information in each file.

To start the bot use `node main.js`
