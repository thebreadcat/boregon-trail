import { Button, Frog, TextInput, parseEther } from 'frog'
import { handle } from 'frog/vercel'
import { devtools } from 'frog/dev'
import { createClient } from '@supabase/supabase-js'
import { serveStatic } from 'frog/serve-static'
import * as dotenv from 'dotenv';
dotenv.config();

const totalTravels = 10;
const BoredTokenContract = '';
const GameWallet         = '';

const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

const eventDefaults = []
const cards = [];

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided.');
}
const supabase = createClient(supabaseUrl, supabaseKey);
const mainDBTable = '';
const secondaryDBTable = '';

type State = {
  values: string[]
}

export const app = new Frog<{ State: State }>({
  initialState: {
    values: []
  },
  assetsPath: '/',
  basePath: '/api',
  imageOptions: {
    fonts: [
      {
        name: 'Press Start 2P',
        source: 'google',
      },
      {
        name: 'Open Sans',
        source: 'google',
      },
    ],
  },
})

const CenteredImage = ({ imageUrl }) => {
  return (
    <div style={{
      alignItems: 'center',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '1',
      width: '100%',
    }}>
      <img src={imageUrl} />
    </div>
  );
}

app.frame('/', (c) => {
  return c.res({
    image: process.env.NEXT_PUBLIC_URL + '/intro.gif',
    intents: [
      <Button action="/start">Play!</Button>,
      <Button action="/rules">Rules</Button>,
      <Button action="/bored">$BORED?</Button>,
    ]
  })
});

app.frame('/bored', (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondImageUrl = process.env.NEXT_PUBLIC_URL + '/L_TOKEN.png';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondImageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '80', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center'}}>
            $Bored Token
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '24', alignItems: 'flex-start', textAlign: 'left', width: '60vw', flex: '1', marginLeft: '40vw'}}>
            <p style={{color: '#fff', fontSize: '24', marginBottom: '0.5rem', lineHeight: '2'}}>This game requires the use of $BORED to play.</p>
            <p style={{color: '#fff', marginBottom: '0.5rem', fontSize: '24', lineHeight: '2'}}>You can learn more in the $Bored Discord or buy some off Uniswap.</p>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Back</Button>,
      <Button.Link href="https://discord.gg/rGtJjbcxVT">$BORED Discord</Button.Link>,
      <Button.Link href="https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x70737489DFDf1A29b7584d40500d3561bD4Fe196">Uniswap</Button.Link>,
    ]
  })
});

app.frame('/rules', (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondImageUrl = process.env.NEXT_PUBLIC_URL + '/bored-rules-image.png';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondImageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '80', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center'}}>
            Rules
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '24', alignItems: 'flex-start', textAlign: 'left', width: '60vw', flex: '1', marginRight: 'auto'}}>
            <p style={{color: '#fff', fontSize: '24', marginBottom: '0.5rem', lineHeight: '2'}}>Go Onward until you think you cannot go any further.</p>
            <p style={{color: '#fff', marginBottom: '0.5rem', fontSize: '24', lineHeight: '2'}}>The closest to Boregon that survives will win. Whoever dies will lose their chance at the prize pool.</p>
            <p style={{color: '#fff', marginBottom: '0.5rem', fontSize: '24', lineHeight: '2'}}>You can play as much as you want.  The daily games reset at Midnight UTC.</p>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Home</Button>,
      <Button action="/rules/2">How to Win</Button>,
    ]
  })
});

app.frame('/rules/2', (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondImageUrl = process.env.NEXT_PUBLIC_URL + '/bored-how-to-play-image.png';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondImageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '80', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center'}}>
            How to Win
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '24', alignItems: 'flex-start', textAlign: 'left', width: '66vw', flex: '1', marginRight: 'auto'}}>
            <p style={{color: '#fff', fontSize: '24', marginBottom: '1rem', lineHeight: '2'}}>Go the furthest without dying.</p>
            <p style={{color: '#fff', fontSize: '24', marginBottom: '1rem', lineHeight: '2'}}>If tied, the furtherst with the most health or the fastest will win a chunk of the daily pool!</p>
            <p style={{color: '#fff', marginBottom: '0.5rem', fontSize: '24', lineHeight: '2'}}>If you die, you can try to use magic to revive yourself but it will come at a cost.</p>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/">Home</Button>,
      <Button action="/rules">Back</Button>,
      <Button action="/rules/3">Game Play</Button>,
    ]
  })
});

app.frame('/rules/3', (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondaryImage = process.env.NEXT_PUBLIC_URL + '/L_GAME_PLAY.png';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondaryImage} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
        <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '80', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center'}}>
          Gameplay
        </h3>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '24', alignItems: 'flex-start', textAlign: 'left', width: '60vw', paddingTop: '0', flex: '1', marginLeft: '40vw'}}>
          <p style={{color: '#fff', fontSize: '24', marginBottom: '0.5rem', lineHeight: '2'}}>Move onward and you will experience many events on your way to Boregon.</p>
          <p style={{color: '#fff', marginBottom: '0.5rem', fontSize: '24', lineHeight: '2'}}>Some good, Some bad, Some nuetral. Stop or Onward. Stopping saves your distance.  Onward may lead to death. Choose wisely.</p>
        </div>
      </div>
    </div>
    ),
    intents: [
      <Button action="/">Home</Button>,
      <Button action="/rules/2">Back</Button>,
      <Button action="/start">Play!</Button>,
    ]
  })
});

app.frame('/start', async (c) => {
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondaryImage = process.env.NEXT_PUBLIC_URL + '/R_LOAD_UP.png';
  const todaysPrize   = await getPrize();
  let alignment;
  if (secondaryImage.includes("r_")) {
      alignment = 'right';
  } else {
      alignment = 'left';
  }
  return c.res({
    action: '/game-funded',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondaryImage} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: (alignment =='left') ? 'flex-end' : 'flex-start', margin: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '36',textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: (alignment =='left') ? 'left' : 'left', flex: '1', width: '60vw'}}>
          <h3 style={{marginTop: '2rem', marginLeft: '2rem', marginBottom: '2rem', fontSize: '80', lineHeight: '1.4', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff'}}>Going To BOREGON?</h3>
          <div style={{fontSize: '30', color: '#fff', textAlign: 'center', marginLeft: '-3rem', lineHeight: '1.6', width: '50vw', display: 'flex'}}>Pay 1000 $Bored & charge up your oxen and get on the trail</div>
          <div style={{fontSize: '24', color: '#fff', textAlign: 'center', marginLeft: '-3rem', marginTop: '2rem', lineHeight: '1.6', width: '55vw', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span style={{color: '#45f336', marginRight: '1rem'}}>Today’s Prize Pool: </span>
            <span style={{fontSize: '36', marginBottom: '2rem'}}>{todaysPrize || 0} $BORED</span>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction target="/pay-game">Play! (1000 $BORED)</Button.Transaction>,
      <Button action="/bored">$BORED?</Button>,
      <Button action="/">Home</Button>,
    ]
  })
})

app.frame('/game-funded', async (c) => {
  const { transactionId, status, frameData, previousState  } = c;
  const { fid, castId } = frameData;
  var gameId;
  var gameInfo;
  var error;
  var intents = [];
  const gameSettings = {
    small: {
      entry_fee: 1000,
      player_health: 10,
      level: 0
    },
  };
  if(gameInfo && gameInfo.length){
    gameInfo = gameInfo[0];
    if(!gameId){
      gameId = gameInfo[0].id;
    }
  }
  var imageUrl = process.env.NEXT_PUBLIC_URL + '/YOUR_JOURNEY.png';
  if(transactionId && gameInfo && gameId){
    intents.push(<Button value={gameId.toString()} action="/travel">Onward!</Button>);
  } else {
    imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
    intents.push(<Button action="/">Home</Button>);
    intents.push(<Button.Link href="https://warpcast.com/breadcat">Fetch the Sherif (dev)</Button.Link>);
  }
  return c.res({
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', }}>
        {(transactionId) && (
          <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
            <CenteredImage imageUrl={imageUrl} />
          </div>
        )}
        {(!transactionId) && (
          <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
            <CenteredImage imageUrl={imageUrl} />
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '36', paddingLeft: '4rem', textTransform: 'uppercase', color: '#45f336', alignItems: 'flex-start', textAlign: 'left', marginTop: '0rem'}}>
              <h1 style={{fontSize: '60', lineHeight: '2', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff'}}>Something Strange Happened!</h1>
              <div style={{display: 'flex', lineHeight: '1.6', width: '60vw', color: '#fff', fontSize:"28"}}>Seems we couldn't get your duel scheduled.  Try reaching out to the Sherif to investigate.</div>
            </div>
          </div>
        )}
      </div>
    ),
    intents: intents,
  })
})

app.frame('/stop-check', async (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const gameId = buttonValue;
  const gameData = await getGameDataById(gameId);
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static.png';
  const secondaryImage = process.env.NEXT_PUBLIC_URL + '/L_STOP_HERE.png';
  const alignment = 'left';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondaryImage} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '65', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>
            STOP!? Are You Sure?
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', fontSize: '26', color: '#fff', padding: '2rem', paddingLeft: '0', marginLeft: (alignment == 'left') ?'40vw' : '-30vw', width: (alignment == 'right') ? '60vw' : '60vw', lineHeight: '2', flex: '1', justifyContent: 'flex-start', textAlign: 'left'}}>
            <div style={{fontSize: '22',display: 'flex', flexDirection:'column', marginBottom: '2rem'}}>
              Stopping will end your journey here. You will be in the daily running but cannot continue later.
            </div>
            <div style={{fontSize: '22',display: 'flex', flexDirection:'column'}}>
              Are you for real sure?
            </div>
          </div>
        </div>
        <div style={{fontSize: '25', height: '8vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', paddingTop: '1.5rem'}}>
          <span>Traveled: {gameData.level * 5} Miles<span style={{marginRight: '3rem'}}></span> Health: {describeHealth(gameData.health) || 'Dead'}</span>
        </div>
      </div>
    ),
    intents: [
      <Button value={gameId.toString()} action="/stop">Yes, Stop</Button>,
      <Button value={gameId.toString()} action="/travel">Nevermind, Onwards!</Button>,
    ]
  })
})

app.frame('/stop', async (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const gameId = buttonValue;
  const gameData = await getGameDataById(gameId);
  await updateGameState(gameId, { is_stopped: true });
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static.png';
  const secondaryImage = process.env.NEXT_PUBLIC_URL + '/L_STOP.png';
  const alignment = 'left';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondaryImage} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '65', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>
            Stop Successful
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', fontSize: '26', color: '#fff', padding: '2rem', paddingLeft: '0', marginLeft: (alignment == 'left') ?'40vw' : '-30vw', width: (alignment == 'right') ? '60vw' : '60vw', lineHeight: '2', flex: '1', justifyContent: 'flex-start', textAlign: 'left'}}>
            <div style={{fontSize: '22',display: 'flex', flexDirection:'column', marginBottom: '2rem'}}>
              Your Distance has been saved as a valid entry for REWARD Chances.
            </div>
            <div style={{fontSize: '22',display: 'flex', flexDirection:'column'}}>
              Not quite to Boregon, but closer than those who fell.
            </div>
          </div>
        </div>
        <div style={{fontSize: '25', height: '8vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', paddingTop: '1.5rem'}}>
          <span>Traveled: {gameData.level * 5} Miles<span style={{marginRight: '3rem'}}></span> Health: {describeHealth(gameData.health) || 'Dead'}</span>
        </div>
      </div>
    ),
    intents: [
      <Button value={gameId.toString()} action="/">Play Again?</Button>,
      <Button.Link href={`https://warpcast.com/~/compose?text=Just%20Played%20Boregon%20Trail!%20Now%20I%20am%20sharing%20my%20stats%20because%20you%20cannot%20beat%20me!&embeds[]=https://my-boregon.framesframes.xyz/api?gameId=${gameId.toString()}`}>Share</Button.Link>
    ]
  })
})

app.frame('/travel', async (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const gameId = buttonValue;
  const travelImage = getRandomNumber(1, totalTravels);
  const gameData = await getGameDataById(gameId);
  const currentLevel = parseInt(gameData.level) + 1;
  await updateGameState(gameId, { level: currentLevel });
  const randomCard = getRandomNumber(0, cards.length - 1);
  const gameIdAndCard = gameId.toString() + '-' + randomCard.toString();
  return c.res({
    image: process.env.NEXT_PUBLIC_URL + '/travel-' + travelImage + '.gif',
    intents: [
      <Button value={gameIdAndCard} action="/travel-result">Oh Great, Now what</Button>,
    ]
  })
})

app.frame('/travel-result', async (c) => {
  const { buttonValue, status, frameData  } = c
  const { fid, castId } = frameData;
  const gameIdAndCard = buttonValue;
  const parts = gameIdAndCard.split('-');
  const gameId = parts[0];
  const cardIndex = parts[1];
  const game = await getGameData(gameId);
  const cardData = getCardData(cards, cardIndex);
  const travelImage = (cardData.image) ? cardData : getRandomEventItem(eventDefaults);
  let alignment;
  var intents = [];
  var imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static.png';
  var secondImageUrl = process.env.NEXT_PUBLIC_URL + '/' + travelImage.image;
  var isGameOver = 0;
  if (secondImageUrl.includes("R_")) {
    alignment = 'right';
  } else {
    alignment = 'left';
  }
  if(!isGameOver){
    intents.push(<Button value={gameId.toString()} action="/stop-check">✋ STOP!</Button>);
    intents.push(<Button action="/standings" value={gameId.toString()}>Check Standings</Button>),
    intents.push(<Button value={gameId.toString()} action="/travel">Onward! 👉</Button>);
  } else {
    if(!game.used_revive){
      intents.push(<Button value={gameId.toString()} action="/revive-check">Revive (500 $B)</Button>);
    }
    intents.push(<Button value={gameId.toString()} action="/">Game Over</Button>);
    intents.push(<Button.Link href={`https://warpcast.com/~/compose?text=Just%20Died%20on%20my%20way%20to%20Boregon%21%20%20Try%20your%20luck%20and%20see%20if%20you%20make%20it%20further%20without%20dying%21&embeds[]=https://my-boregon.framesframes.xyz/api?gameId=${gameId.toString()}`}>Share Your Journey!</Button.Link>);
  }
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondImageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '60', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>
            {cardData.titleText}
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', fontSize: '26', color: '#fff', padding: '2rem', paddingLeft: '0', marginLeft: (alignment == 'left') ?'40vw' : '-30vw', width: (alignment == 'right') ? '60vw' : '60vw', lineHeight: '2', flex: '1', justifyContent: 'flex-start', textAlign: 'left'}}>
            <div style={{fontSize: '22',display: 'flex', flexDirection:'column'}}>
              {cardData.mainText}
            </div>
            {(cardData.healthChange && !isGameOver) && (
              <div style={{fontSize: '20',display: 'flex', flexDirection:'column', opacity: '0.8', marginTop: '1rem'}}>
                {cardData.healthChange} Health
              </div>
            )}
            {(isGameOver) && (
              <h1 style={{fontSize: '30', letterSpacing: '0', color: 'red', display: 'flex', flexDirection:'column'}}>
                GAME OVER. YOU DIED.
              </h1>
            )}
          </div>
        </div>
        <div style={{fontSize: '25', height: '8vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', paddingTop: '1.5rem'}}>
          <span>Traveled: {game.level * 5} Miles<span style={{marginRight: '3rem'}}></span> Health: {describeHealth(game.health) || 'Dead'}</span>
        </div>
      </div>
    ),
    intents: intents,
  })
})

app.frame('/revive-check', async (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const gameId = buttonValue;
  const game = await getGameData(gameId);
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/REVIVE_1.png';
  return c.res({
    action: '/revive',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', alignItems: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '36', marginTop: '0', flex: '1', textTransform: 'uppercase', textAlign: 'center'}}>
          <h3 style={{color: '#45f336', margin: '0', marginTop: '4rem', padding: '0', fontSize: '65', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>Revive Yourself?</h3>
          <p style={{color: '#fff', marginBottom: '0.5rem', textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent:'center'}}>That will cost you 500 $BORED</p>
        </div>
      </div>
    ),
    intents: [
      <Button.Transaction value={gameId.toString()} target="/pay-revive">Revive Me! (500 $B)</Button.Transaction>,
      <Button action="/">Stay Dead</Button>,
    ]
  })
});

app.frame('/revive', async (c) => {
  const { transactionId, status, buttonValue, frameData, previousState, deriveState } = c;
  const { fid, castId } = frameData;
  const gameId = previousState.gameId;
  const game = await getGameData(gameId);
  var imageUrl = process.env.NEXT_PUBLIC_URL + '/REVIVE_2.png';
  var intents = [];
  if (transactionId) {
    const randomNumber = Math.random();
    const reviveHealth = (randomNumber < 0.05) ? 10 : 3;
    game.health = parseInt(game.health) + parseInt(reviveHealth);
    game.health = (game.health > 10) ? 10 : game.health;
    await updateGameState(gameId, { is_dead: false, is_stopped: false, is_winner: false, health: game.health, used_revive: true });
    intents.push(<Button action="/stop-check" value={gameId.toString()}>Stop Here!</Button>);
    intents.push(<Button action="/standings" value={gameId.toString()}>Check Standings</Button>);
    intents.push(<Button action="/travel" value={gameId.toString()}>Onward!</Button>);
  } else {
    imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
    intents.push(<Button action="/revive-check" value={gameId.toString()}>Try Reviving Again?</Button>);
    intents.push(<Button action="/" value={gameId.toString()}>Stay Dead</Button>);
  }
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        {(transactionId) && (

          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', alignItems: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '36', marginTop: '0', flex: '1', textTransform: 'uppercase', textAlign: 'center'}}>
            <h3 style={{color: '#45f336', margin: '0', marginTop: '4rem', padding: '0', fontSize: '58', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>You're back. horay.</h3>
            <p style={{color: '#fff', marginBottom: '0.5rem'}}>Be more careful this time.</p>
          </div>
        )}
        {(!transactionId) && (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', alignItems: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '36', marginTop: '0', flex: '1', textTransform: 'uppercase', textAlign: 'center'}}>
            <h3 style={{color: '#45f336', margin: '0', marginTop: '4rem', padding: '0', fontSize: '58', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center', lineHeight: '1.6'}}>Revive Failed.</h3>
            <p style={{color: '#fff', marginBottom: '0.5rem'}}>Maybe Try again?</p>
          </div>
        )}
      </div>
    ),
    intents: intents
  })
});

app.frame('/standings', async (c) => {
  const { buttonValue, status, frameData } = c;
  const { fid, castId } = frameData;
  const gameId = buttonValue;
  const ranking       = await getUserRanking(fid);
  const todaysPrize   = await getPrize();
  const yesterdayData = await getPreviousGameData();
  const imageUrl = process.env.NEXT_PUBLIC_URL + '/background-static-empty.png';
  const secondImageUrl = process.env.NEXT_PUBLIC_URL + '/R_STANDINGS.png';
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 30, flexDirection: 'column', justifyContent:'center', height: '100vh'}}>
        <CenteredImage imageUrl={imageUrl} />
        <CenteredImage imageUrl={secondImageUrl} />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'font-["Press Start 2P"]', fontSize: '25', textTransform: 'uppercase', color: '#45f336', alignItems: 'center', textAlign: 'center', flex: '1', width: '100vw'}}>
          <h3 style={{margin: '0', marginTop: '4rem', padding: '0', fontSize: '80', textShadow: '-8px -4px 0px #00614f, 8px 4px 0px #fff', alignItems: 'center', textAlign: 'center'}}>
            Your Standing
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '2rem', fontFamily: 'font-["Press Start 2P"]', fontSize: '24', alignItems: 'flex-start', textAlign: 'center', width: '60vw', flex: '1', paddingTop: '1rem', marginRight: 'auto'}}>
            <p style={{color: '#fff', fontSize: '38', marginBottom: '0.5rem', lineHeight: '1.4', textAlign: 'center'}}>You're {ranking}!</p>
            <div style={{color: '#fff', textAlign: 'center', display: 'flex', width: '60vw', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.6rem', fontSize: '30', flexDirection: 'column'}}>
              <span style={{fontSize: '24', marginBottom: '1rem'}}>Today's Prize</span>
              <span style={{color: '#45f336', fontSize: '36'}}>{Math.floor(todaysPrize) || '0'} $BORED</span>
            </div>
            {(yesterdayData ) && (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{color: '#fff', textAlign: 'center', display: 'flex', width: '60vw', marginBottom: '1.6rem', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', fontSize: '26', flexDirection: 'column'}}>
                  <span style={{fontSize: '24', marginBottom: '1rem'}}>Yesterday's Prize:</span>
                  <span style={{color: '#45f336', fontSize: '36'}}>{Math.floor(yesterdayData.payoutAmount) || 0} $BORED</span>
                </div>
                <div style={{color: '#fff', textAlign: 'center', display: 'flex', width: '60vw', marginBottom: '0.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', fontSize: '26'}}>
                  Winner: <span style={{color: '#45f336'}}>{'@' + yesterdayData.username || ''}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action="/stop-check" value={gameId.toString()}>Stop Here!</Button>,
      <Button action="/travel" value={gameId.toString()}>Onward!</Button>,
    ]
  })
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCardData(cards, cardIndex) {
  if (cards && cards.length > cardIndex && cardIndex >= 0 && cards[cardIndex]) {
    return cards[cardIndex];
  } else {
    return false;
  }
}

async function getGameDataById(gameId: string){
  const { data, error } = await supabase
    .from(mainDBTable)
    .select('*')
    .eq('id', gameId)
    .single();
  if(error){
    console.log('error', error);
    return false;
  }
  if(data){
    return data;
  } else {
    return false;
  }
}

async function getGameData(gameId: string){
  if (!gameId) {
    return false;
  }
  try {
    const { data, error } = await supabase
      .from(mainDBTable)
      .select('*')
      .eq('id', gameId.toString())
    .single();

    if (error) {
      console.log('error', error);
      return false;
    }

    console.log('data', data);
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function getUserRanking(fid: string) {
  const { data, error } = await supabase
    .from(mainDBTable)
    .select('*')
    .gte('created_at', new Date().toISOString().slice(0, 10))
    .order('level', { ascending: false });
  if (error) {
    console.error('Error fetching rankings:', error);
    return 'not even close to the top';
  }
  const rank = data.findIndex(game => game.fid === fid) + 1;

  if (rank === 0) {
    return 'not even close to the top';
  }
  const totalGames = data.length;
  return 'not even close to the top';
}

function describeHealth(health) {
  const result = healthDescriptions.find(item => health >= item.threshold);
  return result ? result.description : 'Dead';
}

function getRandomEventItem(items) {
  const filteredItems = items.filter(item => item.action === "event");
  if (filteredItems.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  return filteredItems[randomIndex];
}

function getRandomDeath(items) {
  const filteredItems = items.filter(item => item.action === "death");
  if (filteredItems.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  return filteredItems[randomIndex];
}

async function updateGameState(gameId: string, updates) {
  const { data, error } = await supabase
      .from(mainDBTable)
      .update(updates)
      .eq('id', gameId);
  return { data, error };
}

async function stopPreviousGames(fid, currentGameId) {
  try {
    const { data, error } = await supabase
      .from(mainDBTable)
      .update({ is_stopped: true })
      .eq('fid', fid)
      .not('id', 'eq', currentGameId)
      .eq('is_dead', false)
      .eq('is_stopped', false);
      if (error) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error stopping previous games:', error);
    return false;
  }
}

async function getPrize() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  const isoToday = today.toISOString();
  const { data: games, error: gamesError } = await supabase
    .from(mainDBTable)
    .select('*')
    .gte('created_at', isoToday);

  if (gamesError) {
    console.log('Error fetching today\'s games:', gamesError);
    return null;
  }

  // Calculate games and revives funds
  const totalGames = games.length;
  const totalRevives = games.filter(game => game.used_revive).length;
  const gamesFunds = parseInt(totalGames * 1000) + parseInt(totalRevives * 500);

  const todayFormat = today.toISOString().slice(0, 10);
  const { data: todayGame, error: gameError } = await supabase
    .from(secondaryDBTable)
    .select('starting_pot_value, extra_funds')
    .eq('game_date', todayFormat)
    .single();

  if (gameError) {
    console.log('Error fetching today\'s game details:', gameError);
    return null;
  }

  // Calculate today's total prize
  const todaysPrize = Math.floor((parseInt(gamesFunds) + parseInt(todayGame.starting_pot_value) + parseInt(todayGame.extra_funds))* 0.65);
  return todaysPrize;
}

async function getPreviousGameData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const isoYesterday = yesterday.toISOString();
  const isoToday = today.toISOString();
  const yesterdayFormat = yesterday.toISOString().slice(0, 10);

  const { data: yesterdayPayout, error: payoutError } = await supabase
    .from(secondaryDBTable)
    .select('*')
    .eq('game_date', yesterdayFormat)
    .limit(1)
    .single();

  if (payoutError || !yesterdayPayout) {
    console.log('Error fetching yesterday\'s payout record:', payoutError);
    return false;
  }

  const { data: winningGame, error: gameError } = await supabase
    .from(mainDBTable)
    .select('*')
    .eq('id', yesterdayPayout.winning_game_id)
    .single();

  if (gameError || !winningGame) {
    console.log('Error fetching yesterday\'s winning game:', gameError);
    return false;
  }

  return {
    username: winningGame.username,
    fid: winningGame.fid,
    payoutAmount: Math.floor(parseInt(yesterdayPayout.payout_amount) * 0.65)
  };
}


export const GET = handle(app)
export const POST = handle(app)
devtools(app, { serveStatic })