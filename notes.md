# Notes

## TODOs for an MVP:
- Add error handling for signup / login - currently nothing happens in case of failure.
- Add email verification and 
- Add flow for first time visitor - create a popup with a FAQ video of 30 seconds. 
- Add ability to create notes despite not being logged in. Then, if user logs in, sync those. 
- Add some kind of basic sync / merge mechanism cause now we can simultaneously edit on many devices (probably will just keep the newer note)
- Think about and add ability to somehow scroll around and zoom out / in if notes go out of bounds - needed for mobile especially. Possibly some other way could work - but can't want to just list notes from top to down, as the mirror must be visible on mobile too. Just scrolling around as MVP could work, possibly adding indicators to where notes are at the edges of the screen?
- Consider if we need to add "title" to the note, I don't see it really.
- Test in all browsers, I think safari won't allow textarea resize currently due to it being in an automatically sized container element, but surely there will be other quirks. 
