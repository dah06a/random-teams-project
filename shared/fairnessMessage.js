export const fairnessMessage = (num) => {
    switch (num) {
        case 0:
            return 'The teams are PERFECTLY matched! - 10/10';
        case 1:
            return 'These teams are AMAZING! - 9/10';
        case 2:
            return 'These teams are great! - 8/10';
        case 3:
            return 'These teams are pretty good. - 7/10';
        case 4:
            return 'These teams are okay. - 6/10';
        case 5:
            return 'These teams will work. - 5/10';
        case 6:
            return 'These teams are not-so-great. - 4/10';
        case 7:
            return 'These teams are bad. - 3/10';
        case 8:
            return 'These teams are really bad. - 2/10';
        case 9:
            return 'These teams are HORRIBLE! - 1/10';
        case 10:
            return 'The teams are the WORST they can be. - 0/10';
        default:
            return 'Something went wrong.  Try again.'
    }
}
