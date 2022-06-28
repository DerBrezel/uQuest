# this file contains the initial attempt at content based filtering
# the input for this program will be a quest dataset and a player profile
# the output will be the quest that matches best (or maybe a selection)


import pandas as pd

# create test preference profile
pp = pd.Series({"Action": 0.2,
                "Erkundung": 0.4,
                "Social": 0.3})

# create test dataframe with example weights,
df = pd.DataFrame({"Action": [0.1, 0.4, 0.8],
                   "Erkundung": [0.5, 0.1, 0.2],
                   "Social": [0.1, 0.8, 0.3]})

print("Preference profile: \n \n", pp, "\n")


def cfilter(pp, df):     # calculate difference between each point in pp and df, sum up in value, sort by value
    df["Diff"] = 0  # add new column for weights
    for index in range(df.shape[0]):    # iterate through rows
        x = range(len(pp))
        for i in x:                     # iterate through pp
            n = pp[i]                   # get individual pp value
            idiff = abs(df.iat[index, i] - n)   # calculate difference as absolute value
            df.at[index, "Diff"] += idiff       # add to total difference
    result = df.sort_values(by=["Diff"], ascending=True)  # sort by difference
    return result


print("Recommended Quests: \n \n", cfilter(pp, df))

# read csv, the delimiter must be set to allow for commas in the columns
qdf = pd.read_csv("skyrim_db.csv", delimiter=";")

print(qdf)
