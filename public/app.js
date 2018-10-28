document.addEventListener("DOMContentLoaded", function(event) {
    $('#signin-button').on('click', function(event) {
        event.preventDefault()
        const origin = window.location.origin
        blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data']);
    })
    $('#signout-button').on('click', function(event) {
        event.preventDefault()
        blockstack.signUserOut(window.location.href)
        window.location = window.location.origin;
    })

    function showProfile(profile) {
        var person = new blockstack.Person(profile)
        $('#heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
        if(person.avatarUrl()) {
            $('#avatar-image').attr('src', person.avatarUrl())
        }
        $('#section-1').hide()
        $('#signout-button').show();
        $('#section-2').show()
    }

    function savePublicKey(userData) {
        var privateKey = userData.appPrivateKey;
        var publicKey = window.getPublicKeyFromPrivate(privateKey);
        blockstack.putFile('public_key.txt', publicKey, { encrypt: false });
    }

    if (blockstack.isUserSignedIn()) {
        var userData = blockstack.loadUserData();
        var profile = userData.profile
        showProfile(profile);
        savePublicKey(userData);
        // $(this).click(function (j) {
        //     var href = ($(this).attr('nav.html'));
        //     window.location = href;
        //     return true;
        // })
    } else if (blockstack.isSignInPending()) {
        blockstack.handlePendingSignIn().then(function(userData) {
            showProfile(profile)
            savePublicKey(userData);
        })
    }
});
// }
// })

// document.addEventListener("DOMContentLoaded", function(event) {
//   document.getElementById('signin-button').addEventListener('click', function(event) {
//     event.preventDefault()
//     blockstack.redirectToSignIn()
//   })
//   document.getElementById('signout-button').addEventListener('click', function(event) {
//     event.preventDefault()
//     blockstack.signUserOut(window.location.href)
//   })
//
//   function showProfile(profile) {
//     var person = new blockstack.Person(profile)
//     document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
//     if(person.avatarUrl()) {
//       document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
//     }
//     document.getElementById('section-1').style.display = 'none'
//     document.getElementById('section-2').style.display = 'block'
//   }
//
//   if (blockstack.isUserSignedIn()) {
//     var profile = blockstack.loadUserData().profile
//       showProfile(profile)
//   } else if (blockstack.isSignInPending()) {
//     blockstack.handlePendingSignIn().then(function(userData) {
//       window.location = window.location.origin
//     })
//   }
// })
