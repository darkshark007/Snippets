import os
import platform
import sys

if sys.version[0] == "2":
    inp_function = raw_input
elif sys.version[0] == "3":
    inp_function = input

consumable_input = []
def get_input(displayString):
    # Get input
    if len(consumable_input) == 0:
        inp = inp_function(displayString)
    else:
        inp = consumable_input.pop(0).strip()
        if inp == "pause":
            inp_function("Input paused.  Press Enter to continue\n>  ")
            return get_input(displayString)
        elif inp == "!!":
            return inp_function(displayString)
        else:
            print(displayString+inp)

    # Convert to UTF-8
    # try:
    #     inp = unicodedata.normalize('NFKD', inp).encode('ascii','ignore')
    # except:
    #     pass

    return inp


def input_string(message, validList=None):
    """
    General input method for requesting a string.  Optionally asserts values are
    contained in a given list

    :param string message: The message displayed when prompting for input
    :param [string] validList: The maximum accepted value for expected input
    """
    inp = get_input(message)
    if validList is not None and inp not in validList:
        print("Value \'"+inp+"\' is not a valid value")
        return input_string(message, validList)
    return inp


def input_number(message, minVal=None, maxVal=None):
    """
    General input method for requesting an integer.  Validates input, rejects
    non-numeric values and optionally asserts minimum and maximum values.

    :param string message: The message displayed when prompting for input
    :param int minVal: The minimum accepted value for expected input
    :param int maxVal: The maximum accepted value for expected input
    """
    inp = get_input(message)
    try:
        val = int(inp)
        # TODO Check for floats?!  Input floats will be truncated unexpectedly
        if minVal != None and val < minVal:
            print("Value \'"+inp+"\' is too low")
            return input_number(message, minVal, maxVal)
        if maxVal != None and val > maxVal:
            print("Value \'"+inp+"\' is too high")
            return input_number(message, minVal, maxVal)
        return val
    except ValueError:
        print("Invalid number value \'"+inp+"\'")
        return input_number(message, minVal, maxVal)


def input_float(message, minVal=None, maxVal=None):
    """
    General input method for requesting a float.  Validates input, rejects
    non-numeric values and optionally asserts minimum and maximum values.

    :param string message: The message displayed when prompting for input
    :param int minVal: The minimum accepted value for expected input
    :param int maxVal: The maximum accepted value for expected input
    """
    inp = get_input(message)
    try:
        val = float(inp)
        if minVal != None and val < minVal:
            print("Number \'"+inp+"\' is too low")
            return input_float(message, minVal, maxVal)
        if maxVal != None and val > maxVal:
            print("Number \'"+inp+"\' is too high")
            return input_float(message, minVal, maxVal)
        return val
    except ValueError:
        print("Invalid number value \'"+inp+"\'")
        return input_float(message, minVal, maxVal)


def input_tf(message):
    """
    General input method for requesting a boolean, or yes/no, value.  Validates
    input, rejects non-truthy values.

    :param string message: The message displayed when prompting for input
    """
    inp = get_input(message).lower()
    if inp == "y" or inp == "yes" or inp == "t" or inp == "true":
        return True
    elif inp == "n" or inp == "no" or inp == "f" or inp == "false":
        return False
    else:
        print("Invalid value \'"+inp+"\'")
        return input_tf(message)


def clear_screen():
    # "Clear" the screen
    if os.name == 'posix' and platform.system() == 'Darwin' and platform.machine() == 'x86_64':
        # os.system('cls')
        os.system('clear')
    else:
        # print(chr(27) + "[2J")
        # print(chr(8)*10000)
        print("\n"*120)


def fuzzy_string_search(inp, within, fuzz=5):
    if inp in within:
        return True
    for i in range(len(inp)-(fuzz-1)):
        if inp[i:i+fuzz] in within:
            return True
    return False
