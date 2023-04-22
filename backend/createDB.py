import yfinance as yf
import pandas as pd

data = yf.Ticker("TSLA").history(period="2y")

# Calculate SMA
data['SMA10'] = data['Close'].rolling(10).mean()
data['SMA30'] = data['Close'].rolling(30).mean()
data['SMA50'] = data['Close'].rolling(50).mean()

# Calculate RSI-14
periods = 14
close_delta = data['Close'].diff()
up = close_delta.clip(lower=0)
down = -1 * close_delta.clip(upper=0)
ma_up = up.ewm(com = periods - 1, adjust=True, min_periods = periods).mean()
ma_down = down.ewm(com = periods - 1, adjust=True, min_periods = periods).mean()
rsi = ma_up / ma_down
rsi = 100 - (100/(1 + rsi))

data['RSI14'] = rsi

# Convert date index to column
data = data.reset_index()

data.to_csv("TSLA.csv")