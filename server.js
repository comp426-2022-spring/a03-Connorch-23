const express = require('express');
const app = express()
const port = process.env.port || 3000
/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

 function coinFlip() {
    let chance = Math.random();
    if (chance >= .5) {
      return "heads";
    } else {
      return "tails";
    }
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
  function coinFlips(flips) {
    const record = [];
  
    if (flips == undefined) {
      flips = 1;
    }
    
    for (let i = 0; i < flips; i++) {
        record[i] = coinFlip();
    }
    return record;
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
  function countFlips(array) {
    let flips = {tails: 0, heads: 0};
    for (let i=0; i < array.length;i++) {
      if (array[i].localeCompare("heads")==0) {
        flips.heads++;
      } else {
        flips.tails++;
      }
    }
    if (flips.heads==0) {
      delete flips.heads;
    }
    if (flips.tails==0) {
      delete flips.tails;
    }
    return flips;
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
   let game;
    if (call == undefined) {
      console.log("Error: no input.");
      console.log("Usage: node guess-flip --call=[heads|tails]");
    } else if (!call.localeCompare("heads") || !call.localeCompare("tails")) {
      game = {call:call, flip:coinFlip(), result:'lose'}
      if (game.call.localeCompare(game.flip) == 0) {
        game.result = "win"
      }
    } else {
      console.log("Error: Invalid input");
      console.log("Usage: node guess-flip --call=[heads|tails]");
    }
  
    return game;
  }
  



const server = app.listen(port, () => {
    console.log('App listening on port %PORT'.replace('%PORT',port))
});


app.get('/app/', (req,res) => {
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.statusMessage = 'OK';
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.get('/app/flip/call/:call', (req,res) => {
  const call = req.params.call;
  res.status(200).json(flipACoin(call))
})  

app.get('/app/flip/', (req,res) => {
    res.status(200).json({'flip' : coinFlip()})
})

app.get('/app/flips/:number', (req,res) => {
    const flips = coinFlips(req.params.number)
    res.status(200).json({'raw': flips, 'summary': countFlips(flips)})
})

app.get('/app/echo/:number', (req,res) => {
    res.status(200).json({ 'message': req.params.number })
})

app.use(function(req,res) {
  res.type("text/plain")
    res.status( 404).send("404 Not found")
})

  