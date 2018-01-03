# What is Keyboard Refresh Rate Evaluator?
It's an HCI program that computes the scan rate of your keyboard.

# How to use it?
https://jessie1201.github.io/Keyboard_RefreshRate/
Follow the instruction to evaluate your keyboard scan rate.

# Theory
The scan rate (refresh rate) indicates the frequency the keyboard updates the state of its key matrix.
Since when keystrokes are in a very rapid manner, some thick lines can be identified through the plot. The interval time between the lines is exactly the period of time between each scan/refresh. Scan rate can thus be computed = 1/T

# Significance
Refresh Rate is a performance property of the keyboard, which is particularly important for timing precision, e.g. in gaming and music applications.

# Data capture and analysis
The main code for this core part is in refresh_rate.js