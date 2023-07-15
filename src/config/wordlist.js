const wordlist = [
    'admin',
    'root',
    'password',
    'anonymous',
    'moderator',
    'admin123',
    'user123',
    'testuser',
    'banned',
    'spam',
    'fakeuser',
    'hacker',
    'illegal',
    'offensive',
    'xyz',
    '12345',
    'qwerty',
    'god',
    'devil',
    'satan',
    '666',
    'killer',
    'drugdealer',
    'cheater',
    'racist',
    'sexist',
    'abuser',
    'criminal',
    'terrorist',
    'scammer',
    'fraud',
    'jerk',
    'bully',
    'loser',
    'stalker',
    'psycho',
    'noob',
    'dumb',
    'idiot',
    'fool',
    'dummy',
    'clown',
    'weirdo',
    'weasel',
    'slacker',
    'lazy',
    'greedy',
    'slob',
    'filthy',
    'ugly',
    'gross',
    'disgusting',
    'pathetic',
    'annoying',
    'obnoxious',
    'horrible',
    'terrible',
    'awful',
    'nasty',
    'vile',
    'naughty',
    'wicked',
    'sinful',
    'sick',
    'corrupt',
    'rotten',
    'smelly',
    'rude',
    'mean',
    'cruel',
    'vicious',
    'heartless',
    'cold',
    'evil',
    'deadly',
    'dangerous',
    'toxic',
    'poisonous',
    'violent',
    'destructive',
    'mad',
    'crazy',
    'insane',
    'wacky',
    'absurd',
    'weird',
    'strange',
    'bizarre',
    'odd',
    'eccentric',
    'peculiar',
    'quirky',
    'silly',
    'funny',
    'ridiculous',
    'goofy',
    'dorky',
    'nerdy',
    'geeky',
    'awkward',
    'clumsy',
    'uncool',
    'lame',
    'nerd',
    'abhorrent',
    'asinine',
    'bigot',
    'creep',
    'disgraceful',
    'egotistic',
    'foolish',
    'gullible',
    'hateful',
    'ignoramus',
    'jerk',
    'kook',
    'lunatic',
    'moron',
    'nasty',
    'obnoxious',
    'prejudice',
    'repugnant',
    'scumbag',
    'toxic',
    'abomination',
    'annoying',
    'despicable',
    'dreadful',
    'idiotic',
    'imbecile',
    'insulting',
    'nauseating',
    'odious',
    'repulsive',
    'revolting',
    'stupid',
    'bastard',
    'fuck',
    'shit',
    'cunt',
    'dick',
    'porn',
    'wanker',
    'slut',
    'whore',
    'douchebag',
    'bullshit',
    'asshole',
    'motherfucker',
    'cockhead',
    'bastard',
    'fucking',
    'shithead',
    'pussy',
    'balls',
    'cock',
    'tits',
    'damn',
    'retard',
    'nigger',
    'faggot',
    'spoc',
    'chunk',
    'wig',
    'cracker',
    'kike',
    'gypsy',
    'terrorist',
    'savage',
    'homo',
    'retard',
    'maff',
    'dyke',
    'tronny',
    'sluts',
    'fig',
    'retarded',
    'nigga',
    'shit',
    'weed',
    'meth',
    'coke',
    'heroin',
    'drugs',
    'dope',
    'gun',
    'weapon',
    'kill',
    'steal',
    'crime',
    'robbery',
    'hack',
    'scam',
    'fraud',
    'smuggle',
    'illicit',
    'contraband',
    'terror',
    'assault',
    'murder',
    'religion',
    'politics',
    'race',
    'gender',
    'sexuality',
    'abortion',
    'immigration',
    'war',
    'terrorism',
    'suicide',
    'self-harm',
    'depression',
    'anxiety',
    'racism',
    'sexism',
    'homophobia',
    'xenophobia',
    'bigotry',
    'inequality',
    'prejudice',
    'forbidden',
    'restricted',
    'invalid',
    'unauthorized',
    'blocked',
    'prohibited',
    'unacceptable',
    'disallowed',
    'taboo',
    'objectionable',
    'unsuitable',
    'inadmissible',
    'off-limits',
    'unsanctioned',
    'outlawed',
    'inappropriate',
    'unpermitted',
    'banned',
    'vetoed',
    'censored',
    'unwanted',
    'offensive',
    'disapproved',
    'censured',
    'banished',
    'rejected',
    'excluded',
    'shunned',
    'blacklisted',
    'avoided',
    'notallowed',
    'notpermitted',
    'notwelcome',
    'notacceptable',
    'verboten',
    'contrary',
    'proscribed',
    'tabooed',
    'prohibited',
    'notapproved',
    'notadmissible',
    'noteligible',
    'objectionable',
    'prohibited',
    'banned',
    'unauthorized',
    'forbidden',
    'illegal',
    'taboo',
    'impermissible',
    'off-limits',
    'notallowed',
    'disallowed',
    'unacceptable',
    'unsanctioned',
    'outlawed',
    'proscribed',
    'vetoed',
    'censored',
    'restricted',
    'inappropriate',
    'unpermitted',
    'undesirable',
    'rejected',
    'unwanted',
    'unwelcome',
    'debarred',
    'barred',
    'denied',
    'excluded',
    'unfavorable',
    'undesired',
    'unliked',
    'avoided',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
    'inadmissible',
    'forbidden',
    'uninvited',
    'disallowed',
    'objectionable',
    'taboo',
    'undesirable',
    'restricted',
    'undesired',
    'notapproved',
    'unapproved',
    'censored',
    'repudiated',
    'barred',
    'banned',
    'blacklisted',
    'ineligible',
    'prohibited',
    'unacceptable',
    'inappropriate',
    'outlawed',
    'notpermitted',
    'notallowed',
    'noteligible',
    'unfavorable',
    'unwelcome',
    'denied',
    'excluded',
    'unliked',
    'undesirable',
    'avoided',
    'repelled',
    'unfavorable',
    'repudiated',
    'repelled',
    'shunned',
    'blacklisted',
    'out',
    'disliked',
    'notinvited',
    'notacceptable',
    'unauthorized',
    'unwelcome',
    'notapproved',
    'unadmissible',
    'unwanted',
  ]

  function removeDuplicates(array) {
    return [...new Set(array)];
  }
  export const wordlist1 = removeDuplicates(wordlist)  