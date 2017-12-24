# Keyboard_RefreshRate
An HCI program that computes the scan rate of your keyboard

# Theory
The scan rate (refresh rate) indicates the frequency the keyboard updates the state of its key matrix.
Since when keystrokes are in a very rapid manner, some thick lines can be identified through the plot. The interval time between the lines is exactly the period of time between each scan/refresh. Scan rate can thus be computed = 1/T

# Significance
Refresh Rate is a performance property of the keyboard, which is particularly important for timing precision, e.g. in gaming and music applications.

# Result Evaluation
1000hz polliing rates are common on keyboard

# Data capture and analysis
The main code for this core part is in refresh_rate.js