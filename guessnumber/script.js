let min = 1;
let max = prompt('Interval:');
let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomNumber)
let attempts = 0;

document.getElementById('minRange').textContent = min;
document.getElementById('maxRange').textContent = max;

function checkGuess() {
  let userGuess = parseInt(document.getElementById('userGuess').value);
  
  if (userGuess < min || userGuess > max) {
    document.getElementById('result').textContent = 'Please enter a number within the range.';
    return;
  }
  
  attempts++;
  document.getElementById('attempts').textContent = attempts;

  if (userGuess === randomNumber) {
    document.getElementById('result').textContent = `Congratulations! You've guessed the number in ${attempts} attempts.`;
  } else if (userGuess < randomNumber) {
    document.getElementById('result').textContent = 'The number is higher.';
  } else {
    document.getElementById('result').textContent = 'The number is lower.';
  }

  if (attempts % 3 === 0) {
    if (randomNumber % 2 === 0) {
      document.getElementById('result').textContent += ' Also, the number is even.';
    } else {
      document.getElementById('result').textContent += ' Also, the number is odd.';
    }
  }
}

function resetGame() {
  attempts = 0;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('userGuess').value = '';
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById('result').textContent = '';
}
