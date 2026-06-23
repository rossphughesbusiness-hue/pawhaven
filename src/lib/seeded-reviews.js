/**
 * Seeded reviews — shown on product pages when no user reviews exist in Redis.
 * Real user-submitted reviews (from /api/reviews POST) always appear first.
 */

export const SEEDED_REVIEWS = {
  'maze-slow-feeder-bowl': [
    {
      name: 'Jennifer P.',
      rating: 5,
      text: 'My golden retriever used to inhale his food so fast he\'d throw up almost every meal. Three weeks with this bowl and the problem is completely solved. He actually has to work for his food now and he finishes in about 8 minutes instead of 45 seconds. Worth every penny.',
      date: 'May 14, 2026',
      ts: 1747180800000,
    },
    {
      name: 'Marcus D.',
      rating: 5,
      text: 'Vet recommended a slow feeder for our lab who was at risk for bloat. This one is fantastic — easy to clean, the rubber suction base actually holds on our tile floor, and our dog is obsessed with it. Eating speed dropped dramatically.',
      date: 'April 28, 2026',
      ts: 1745798400000,
    },
    {
      name: 'Tanya R.',
      rating: 4,
      text: 'Really good quality for the price. The maze pattern is complex enough to slow our beagle down significantly. Took a few days to figure out you need to use the suction cup on a smooth surface for it to stick — once we did that, no more scooting across the floor.',
      date: 'April 9, 2026',
      ts: 1744156800000,
    },
  ],

  'calming-lick-mat': [
    {
      name: 'Stephanie L.',
      rating: 5,
      text: 'This thing is literally magic for bath time. I spread some peanut butter on it and stick it to the shower wall, and my dog is in a zen trance the whole time. No more struggling or shaking water everywhere. My groomer actually asked what I was doing differently.',
      date: 'May 20, 2026',
      ts: 1747699200000,
    },
    {
      name: 'Brandon K.',
      rating: 5,
      text: 'My rescue has severe anxiety during thunderstorms. I\'ve tried everything. The lick mat with a little wet food has been the single most effective thing — keeps her occupied and calm when she would otherwise be shaking uncontrollably. Cannot recommend enough.',
      date: 'May 3, 2026',
      ts: 1746230400000,
    },
    {
      name: 'Olivia F.',
      rating: 5,
      text: 'Dishwasher safe and the suction cups actually work — two things that were deal-breakers on the cheaper ones I tried first. The texture variety on the surface means it takes my dog much longer to finish than a flat mat. Great product.',
      date: 'April 15, 2026',
      ts: 1744675200000,
    },
    {
      name: 'Derek M.',
      rating: 4,
      text: 'Solid lick mat. I use it with frozen Greek yogurt and blueberries — healthy and keeps my Aussie busy for a good 20 minutes. Cleanup is easy. Lost one star only because it took a day or two for my dog to figure out she was supposed to lick it.',
      date: 'March 30, 2026',
      ts: 1743292800000,
    },
  ],

  'portable-paw-cleaner': [
    {
      name: 'Rachel G.',
      rating: 5,
      text: 'We live near a hiking trail and our muddy dog situation was out of control. This cleaner is so simple and effective — fill it with water, insert paw, turn. Done in 10 seconds per paw. No more muddy paw prints through the house. Life-changing honestly.',
      date: 'May 18, 2026',
      ts: 1747526400000,
    },
    {
      name: 'Chris N.',
      rating: 4,
      text: 'Works really well for light to medium mud. For really caked-on mud I sometimes need two rounds but that\'s a minor complaint. The silicone bristles are gentle — my sensitive-pawed doodle doesn\'t mind it at all. Compact enough to keep in the car.',
      date: 'April 22, 2026',
      ts: 1745280000000,
    },
    {
      name: 'Amy B.',
      rating: 5,
      text: 'Rainy season in the Pacific Northwest made this a necessity. My corgi actually seems to enjoy the paw wash now — he walks right up to it. Durable, easy to dry out between uses, and the right size for medium dogs. Very happy with this.',
      date: 'April 7, 2026',
      ts: 1743984000000,
    },
  ],

  'silent-cat-water-fountain': [
    {
      name: 'Natalie S.',
      rating: 5,
      text: 'My cat was chronically dehydrated and kept getting UTIs. The vet told me to try a fountain. This one is so quiet I forget it\'s on, and my cat drinks from it constantly now. Her last vet visit was completely clean — kidney values perfect. I genuinely credit this fountain.',
      date: 'May 22, 2026',
      ts: 1747872000000,
    },
    {
      name: 'Kevin O.',
      rating: 5,
      text: 'Had a different brand that made a constant gurgling sound and drove me crazy at night. This one is genuinely silent. My two cats use it constantly. The filter seems high quality and the water always looks and smells clean. Excellent product.',
      date: 'May 6, 2026',
      ts: 1746489600000,
    },
    {
      name: 'Linda C.',
      rating: 4,
      text: 'Great fountain overall — my cats love the flowing stream. I take off one star because you really do need to clean it every 1-2 weeks or you\'ll get some slime buildup. But that\'s true of all fountains. The actual drinking interest has gone way up compared to a bowl.',
      date: 'April 19, 2026',
      ts: 1745020800000,
    },
  ],

  'safeglow-led-collar': [
    {
      name: 'Jason T.',
      rating: 5,
      text: 'My black lab is basically invisible on evening walks. This collar has made such a difference — cars actually slow down now, and I can see her anywhere in the yard. Charges fast via USB and holds charge for several nights. The build quality feels really solid too.',
      date: 'May 16, 2026',
      ts: 1747353600000,
    },
    {
      name: 'Sara M.',
      rating: 5,
      text: 'Bought this after a near miss with a cyclist at dusk. The flashing mode is eye-catching without being annoying. My dog doesn\'t seem to notice she\'s wearing it at all, which is a miracle because she hates accessories. Battery life is impressive.',
      date: 'April 30, 2026',
      ts: 1746057600000,
    },
    {
      name: 'Tom H.',
      rating: 4,
      text: 'Great collar, very bright and the sizing options are good. I have a large border collie and the large fits perfectly. Waterproof as advertised — no issues after rain walks. My only minor gripe is the clasp is a little stiff at first but loosened up after a week.',
      date: 'April 12, 2026',
      ts: 1744416000000,
    },
  ],

  'orthopedic-memory-foam-dog-bed': [
    {
      name: 'Patricia W.',
      rating: 5,
      text: 'My 12-year-old golden has severe hip dysplasia and was struggling to get comfortable at night. After one week on this bed I noticed him sleeping through the night without shifting constantly. The memory foam really does contour around him. I just wish we\'d found this sooner.',
      date: 'May 24, 2026',
      ts: 1748044800000,
    },
    {
      name: 'Mike R.',
      rating: 5,
      text: 'Highest quality dog bed I\'ve ever owned. The cover zips off and goes right in the washing machine — that alone is worth it for us. Our two labs both try to sleep on it at the same time which is actually a problem because only one fits. Getting a second one.',
      date: 'May 8, 2026',
      ts: 1746662400000,
    },
    {
      name: 'Susan D.',
      rating: 4,
      text: 'Very impressed with the foam quality — it\'s much denser than the foam in similar-looking beds I\'ve tried. My older cocker spaniel with arthritis uses it exclusively now. Took off one star because it has a slight off-gassing smell for the first day or two, but it aired out completely.',
      date: 'April 25, 2026',
      ts: 1745539200000,
    },
  ],

  'self-cleaning-slicker-brush': [
    {
      name: 'Emily K.',
      rating: 5,
      text: 'The self-cleaning mechanism is genius. Press the button and all the fur just falls off into the trash — no more picking clumps of dog hair out of brush bristles. My golden\'s coat has never looked better and brushing time is cut in half because I\'m not constantly stopping to clean the brush.',
      date: 'May 12, 2026',
      ts: 1747008000000,
    },
    {
      name: 'Ryan J.',
      rating: 5,
      text: 'Have two huskies. Need I say more? This brush is a lifesaver during shedding season. The ergonomic handle means I can do a full brush session without my hand cramping. The bristles are firm enough to get through the undercoat but my dogs don\'t flinch at all.',
      date: 'April 27, 2026',
      ts: 1745712000000,
    },
    {
      name: 'Monica B.',
      rating: 4,
      text: 'Really good brush. The pin tips are rounded so they don\'t scratch. My golden retriever mix actually leans into it, she loves being brushed with this. Cleanup is much easier than our old paddle brush. Would give 5 stars if the retraction mechanism felt slightly more solid.',
      date: 'April 5, 2026',
      ts: 1743811200000,
    },
  ],

  'retractable-pro-dog-leash': [
    {
      name: 'Andrew S.',
      rating: 5,
      text: 'Finally a retractable leash where the locking mechanism actually works reliably. One-button lock and it stays locked. The 16-foot cord is plenty of range for park walks while still giving me control. Comfortable rubberized grip and the cord is thick enough I don\'t worry about it snapping.',
      date: 'May 19, 2026',
      ts: 1747612800000,
    },
    {
      name: 'Carla V.',
      rating: 4,
      text: 'Good sturdy leash. Bright orange color makes it easy to see which helps prevent tripping. My 55lb dog pulls hard and this has held up well over two months of daily use. The braking feels smooth and responsive. Only complaint is it\'s a bit heavy but that\'s because it\'s built solidly.',
      date: 'May 1, 2026',
      ts: 1746144000000,
    },
    {
      name: 'Donna R.',
      rating: 5,
      text: 'This is my third retractable leash. The first two had buttons that wore out quickly. This one feels like it\'ll last years. My spaniel loves the freedom on trails and I love that I can lock it instantly when we pass other dogs. Exactly what a retractable leash should be.',
      date: 'April 14, 2026',
      ts: 1744588800000,
    },
  ],

  'crinkle-squeaky-toy-bundle': [
    {
      name: 'Nicole H.',
      rating: 5,
      text: 'My dog DESTROYED her old toy in 20 minutes. These have lasted two months and counting. The crinkle texture keeps her more engaged than plain squeaky toys, and having 4 different shapes means she doesn\'t get bored. The materials feel substantial — not cheap stuffed animal quality.',
      date: 'May 21, 2026',
      ts: 1747785600000,
    },
    {
      name: 'Steve C.',
      rating: 5,
      text: 'Great value for the bundle. My two dogs each got one immediately and have been fighting over the others ever since. The squeakers are still working perfectly after weeks of heavy use from a 50lb and a 20lb dog. Highly recommend.',
      date: 'May 4, 2026',
      ts: 1746316800000,
    },
    {
      name: 'Laura M.',
      rating: 4,
      text: 'Nice variety of toys and my puppy loves all of them. The crinkle sound really gets her going. Stitching seems solid — she\'s a hard chewer and no seams have split yet. Rating 4 stars because one of the squeakers is slightly less responsive than the others, but still works.',
      date: 'April 17, 2026',
      ts: 1744848000000,
    },
  ],

  'iq-puzzle-feeder-toy': [
    {
      name: 'Grace T.',
      rating: 5,
      text: 'My border collie was going absolutely stir-crazy during a rainy week indoors. This puzzle toy was the answer. It genuinely challenges her — she had to work at it for 20+ minutes her first try. Mental stimulation is so important for smart breeds and this delivers.',
      date: 'May 17, 2026',
      ts: 1747440000000,
    },
    {
      name: 'Frank N.',
      rating: 5,
      text: 'Vet recommended a puzzle feeder for our dachshund who was overweight from eating too fast and not getting enough stimulation. This has helped both problems. He\'s engaged, he slows down, and he\'s genuinely happy. The difficulty feels appropriate — challenging but not frustrating.',
      date: 'April 29, 2026',
      ts: 1745884800000,
    },
    {
      name: 'Helen A.',
      rating: 4,
      text: 'Good quality puzzle toy. My lab took about three sessions to figure it out and now he\'s pretty quick, but still engaged every time because he loves the kibble reward. Would love a harder mode once they master it, but for beginner to intermediate enrichment this is excellent.',
      date: 'April 11, 2026',
      ts: 1744243200000,
    },
  ],

  'dog-car-seat-hammock': [
    {
      name: 'James B.',
      rating: 5,
      text: 'Kept my backseat clean through a 6-hour road trip with two dogs. The waterproof backing actually works — one of them spilled a whole water bottle and it didn\'t soak through at all. Installation took about 5 minutes. Folds up small. Taking it to every camping trip from now on.',
      date: 'May 23, 2026',
      ts: 1747958400000,
    },
    {
      name: 'Claire S.',
      rating: 5,
      text: 'My anxious dog used to slide all over the backseat during turns and bark constantly. With this hammock she\'s stable and secure and she\'s actually calmer in the car now. The mesh window so she can peek through is a nice touch she uses constantly.',
      date: 'May 7, 2026',
      ts: 1746576000000,
    },
    {
      name: 'Tony M.',
      rating: 4,
      text: 'Really practical product. Fits my SUV perfectly and the attachment points feel secure. The material feels durable — my dog\'s nails haven\'t poked through after many uses. Took off one star because the side straps are a little fiddly to adjust but once set you don\'t need to touch them again.',
      date: 'April 20, 2026',
      ts: 1745107200000,
    },
  ],

  'collapsible-travel-bowl-set': [
    {
      name: 'Ann W.',
      rating: 5,
      text: 'These are the perfect hiking bowls. They collapse completely flat — I forget they\'re in my pack. Clip easily to any bag. My dog drinks from them without hesitation, which isn\'t true of all collapsibles. The silicone is food grade and doesn\'t hold smells after washing.',
      date: 'May 15, 2026',
      ts: 1747267200000,
    },
    {
      name: 'Paul G.',
      rating: 5,
      text: 'Got this for our camping setup. Used them for water and food for a whole weekend and they performed perfectly. The larger one holds a full day\'s worth of water for our medium dog in hot weather. Easy to wash at the camp sink. Very happy with the purchase.',
      date: 'April 26, 2026',
      ts: 1745625600000,
    },
    {
      name: 'Kelly N.',
      rating: 4,
      text: 'Great product. My dog is finicky about bowls and he uses these with no problem. The carabiner clip is sturdy enough to trust on a bag. I wish the set came with a slightly deeper bowl option for water but for travel purposes these work great and take up zero space.',
      date: 'March 28, 2026',
      ts: 1743120000000,
    },
  ],

  'reflective-step-in-harness': [
    {
      name: 'Carol H.',
      rating: 5,
      text: 'My dog hated going over her head for a harness and we basically stopped using one. The step-in design changed everything — she walks right into it no problem. No more morning battles. Fits snugly with no chafing even after long walks. The reflective strips are genuinely bright at night.',
      date: 'May 25, 2026',
      ts: 1748131200000,
    },
    {
      name: 'Robert T.',
      rating: 5,
      text: 'Perfect for my small dog who pulls. The back clip design means no neck strain and gives me much better directional control than a collar. The buckles feel high quality and haven\'t loosened at all after months of daily walks. Very well made.',
      date: 'May 9, 2026',
      ts: 1746748800000,
    },
    {
      name: 'Diana P.',
      rating: 4,
      text: 'Love the harness design. My whippet is shaped unusually (deep chest, tiny waist) and this is one of the few harnesses that fits well. The size guide was accurate. Took a few tries to get the adjustment right but once dialed in it\'s very secure and she moves comfortably in it.',
      date: 'April 23, 2026',
      ts: 1745366400000,
    },
  ],

  'feather-wand-cat-teaser': [
    {
      name: 'Sandra K.',
      rating: 5,
      text: 'My 7-year-old cat had basically stopped playing. I\'d tried everything. This wand got her leaping and running within seconds — she was panting by the end of a 10-minute session. The feather attachment moves unpredictably and that seems to be the key. She\'s a kitten again.',
      date: 'May 11, 2026',
      ts: 1746921600000,
    },
    {
      name: 'Peter L.',
      rating: 5,
      text: 'My cats are toy snobs — they ignore most things after a day. This wand has held their attention for weeks. The flexible wire means the feather tip moves erratically like real prey and they cannot figure it out. The wand itself is solid, not flimsy like the dollar store ones.',
      date: 'April 24, 2026',
      ts: 1745452800000,
    },
    {
      name: 'Mary J.',
      rating: 4,
      text: 'Really effective toy. Both my cats go absolutely wild for this. The feather attachment has held up surprisingly well for a month of daily sessions. I give it 4 stars because I wish a spare feather attachment was included, but that\'s my only complaint about an otherwise great product.',
      date: 'April 6, 2026',
      ts: 1743897600000,
    },
  ],

  'cat-window-perch-hammock': [
    {
      name: 'Diana F.',
      rating: 5,
      text: 'My indoor cat was clearly bored and stressed — overgrooming, not sleeping well. Put up this perch by the window and within an hour she was in it watching birds. She spends hours there every day now. Completely transformed her behavior. The suction cups have held rock solid for two months.',
      date: 'May 26, 2026',
      ts: 1748217600000,
    },
    {
      name: 'George N.',
      rating: 5,
      text: 'Setup was so easy — 10 minutes. The suction cups grip our double-pane window perfectly and it has not moved even a millimeter in 6 weeks despite our 14lb cat using it constantly. The fleece lining looks like it will hold up well and my cat loves the texture.',
      date: 'May 10, 2026',
      ts: 1746835200000,
    },
    {
      name: 'Beth C.',
      rating: 4,
      text: 'Great perch. My cats claimed it immediately. It holds both of them (though it\'s cozy) which is impressive. I re-press the suction cups once a month just to be safe but they\'ve never actually failed. Good size, good quality fabric. My only wish is it came in more colors.',
      date: 'April 16, 2026',
      ts: 1744761600000,
    },
  ],

  'interactive-automatic-laser-toy': [
    {
      name: 'Steven R.',
      rating: 5,
      text: 'Game changer for a working-from-home setup. I turn this on, close my office door, and my cats are entertained for 30 minutes without me. The random pattern keeps them guessing — they never figure out where it\'s going next. Auto-off so I don\'t have to remember to turn it off. Love it.',
      date: 'May 13, 2026',
      ts: 1747094400000,
    },
    {
      name: 'Wendy M.',
      rating: 5,
      text: 'My cats go absolutely feral for this thing (in the best way). Three different speed settings and the erratic movement pattern has kept them engaged for weeks, which is unheard of for laser toys. Great for exercise when I\'m too tired for wand play. The auto-shutoff is a thoughtful feature.',
      date: 'April 28, 2026',
      ts: 1745798400000,
    },
    {
      name: 'Bob T.',
      rating: 4,
      text: 'Fun toy and my cat loves it. The rotating head does a good job varying the pattern. I give it 4 stars because the base can slide on hardwood floors during intense play sessions — a non-slip pad underneath would make it perfect. Otherwise very happy with it.',
      date: 'April 10, 2026',
      ts: 1744329600000,
    },
  ],

  'premium-cat-carrier-backpack': [
    {
      name: 'Julia N.',
      rating: 5,
      text: 'My cat is terrified of carriers. But with this backpack she can see me the whole time and that seems to be the difference. Zero yowling on our last vet trip — a complete miracle. The bubble window is large enough that she can look around. Ventilation is excellent and she never seems hot.',
      date: 'May 27, 2026',
      ts: 1748304000000,
    },
    {
      name: 'Charles L.',
      rating: 5,
      text: 'Used this for a 4-hour flight with my cat in cabin. Security screening was easy, the carrier fits under the seat, and my cat was calm and comfortable the whole flight. The internal safety leash clip is a great detail — she was secure when I opened it for a quick check. Excellent bag.',
      date: 'May 5, 2026',
      ts: 1746403200000,
    },
    {
      name: 'Alice G.',
      rating: 4,
      text: 'Really well designed carrier. The build quality is clearly better than the cheaper options. My large Maine Coon (17 lbs) fits comfortably which was my main concern. The shoulder straps are padded nicely for carrying weight. I took off one star because it runs slightly narrow for very large cats.',
      date: 'April 21, 2026',
      ts: 1745193600000,
    },
  ],

  'cat-deshedding-grooming-glove': [
    {
      name: 'Rose M.',
      rating: 5,
      text: 'My long-haired cat hates the brush. The glove is completely different — she thinks she\'s just being petted and purrs the entire time. I collected an astonishing amount of loose fur the first session. Furniture fur situation noticeably improved within a week. This is the only grooming tool we use now.',
      date: 'May 20, 2026',
      ts: 1747699200000,
    },
    {
      name: 'Walter B.',
      rating: 5,
      text: 'Have two cats — one tolerates grooming, one doesn\'t. The glove works on both. The one who normally runs from the brush actually rolled over asking for more with the glove. The rubber tips grip fur efficiently without scratching. The fur peels off the glove cleanly into the trash.',
      date: 'May 2, 2026',
      ts: 1746230400000,
    },
    {
      name: 'Emma D.',
      rating: 4,
      text: 'Works really well. Shedding on furniture is noticeably down since we started using this regularly. The glove fits my hand well and stays put during use. Only minor issue is it\'s designed for right hands — I\'m left-handed and it still works, just slightly less ergonomic.',
      date: 'April 13, 2026',
      ts: 1744502400000,
    },
  ],

  'cozy-cat-cave-hideaway': [
    {
      name: 'Fiona T.',
      rating: 5,
      text: 'My anxious rescue cat found this within an hour of us putting it down and has slept in it every night since. She needed a space that was entirely hers. The hooded design makes her feel completely secure. Washing it is easy and it held its shape in the dryer perfectly.',
      date: 'May 29, 2026',
      ts: 1748476800000,
    },
    {
      name: 'Nigel C.',
      rating: 5,
      text: 'Our vet told us cats with anxiety need safe hiding spaces. This is perfect — soft enough to be comfortable, structured enough to feel like a den. Both our cats compete for it. The fabric is quality and hasn\'t pilled at all despite heavy use and two washes.',
      date: 'May 6, 2026',
      ts: 1746489600000,
    },
    {
      name: 'Hannah L.',
      rating: 4,
      text: 'Adorable and functional. My cat was sleeping in it the very first night. The material is soft and the opening is sized perfectly for a standard adult cat. I\'d love a larger version for my Maine Coon — she uses it but it\'s a bit tight. For smaller cats it\'s absolutely ideal.',
      date: 'April 18, 2026',
      ts: 1744934400000,
    },
  ],

  'cat-interactive-feeder-bowl': [
    {
      name: 'Patricia K.',
      rating: 5,
      text: 'My cat was vomiting almost every day from eating too fast. This bowl fixed it within the first week. The shallow maze is perfectly sized for her snout — she can use it without frustration.',
      date: 'June 12, 2026',
      ts: 1749686400000,
    },
    {
      name: 'Michael T.',
      rating: 5,
      text: 'Finally a slow feeder designed for cats, not just a dog bowl labeled for cats. The proportions are correct and my two cats both use it without issue. Dishwasher safe is a must-have.',
      date: 'June 4, 2026',
      ts: 1748995200000,
    },
    {
      name: 'Sandra B.',
      rating: 4,
      text: 'Works well. My Siamese took two days to figure it out but now eats from it every meal without hesitation. Slowed her down significantly and no more post-meal vomiting.',
      date: 'May 20, 2026',
      ts: 1747699200000,
    },
  ],

  'cat-tunnel-crinkle-play-tube': [
    {
      name: 'Amanda R.',
      rating: 5,
      text: 'My lazy cat who never plays has completely lost it for this tunnel. She runs through it at full speed 40+ times a day. I\'ve never seen her this active. The crinkle sound triggers something primal in her.',
      date: 'June 15, 2026',
      ts: 1749945600000,
    },
    {
      name: 'James L.',
      rating: 5,
      text: 'Both cats play in it simultaneously without major conflict — the T-junction is key for this. The crinkle material has held up surprisingly well to constant use and occasional aggressive biting.',
      date: 'June 6, 2026',
      ts: 1749168000000,
    },
    {
      name: 'Olivia S.',
      rating: 4,
      text: 'Exactly what I wanted. Folds flat, easy to store, easy to set up. The crinkle is louder than expected (a feature for the cat, less so for me at 6am) but the quality and entertainment value are excellent.',
      date: 'May 28, 2026',
      ts: 1748390400000,
    },
  ],

  'dog-cooling-gel-mat': [
    {
      name: 'David C.',
      rating: 5,
      text: 'My English bulldog overheats in summer and this mat has been transformative. He lies on it for hours voluntarily — completely self-directed. Recharges within 20 minutes of him getting off. Works without power or water.',
      date: 'June 14, 2026',
      ts: 1749859200000,
    },
    {
      name: 'Lisa N.',
      rating: 5,
      text: 'Perfect for my 12-year-old lab who can\'t regulate temperature as well as she used to. She found it herself on the first day and hasn\'t looked back. The large size gives her room to fully stretch out.',
      date: 'June 3, 2026',
      ts: 1748908800000,
    },
    {
      name: 'Tom A.',
      rating: 4,
      text: 'Works exactly as described. Noticeably cool to the touch. My shepherd uses it continuously in the afternoon heat. Needs 30 minutes to recharge between long sessions but for a zero-electricity product that\'s impressive.',
      date: 'May 22, 2026',
      ts: 1747872000000,
    },
  ],

  'sisal-cat-scratching-post': [
    {
      name: 'Catherine M.',
      rating: 5,
      text: 'I put this post right next to the couch my cat was destroying, exactly as recommended. She\'s used the post exclusively for three weeks and hasn\'t touched the couch once. The height and sisal texture are what make it work.',
      date: 'June 16, 2026',
      ts: 1750032000000,
    },
    {
      name: 'Robert K.',
      rating: 5,
      text: 'My tall Maine Coon can fully extend on this — that\'s rare in a scratching post. The base doesn\'t wobble even when he pushes hard. He started using it the same day I set it up.',
      date: 'June 5, 2026',
      ts: 1749081600000,
    },
    {
      name: 'Helen S.',
      rating: 4,
      text: 'Good quality sisal, stable base, appropriate height. My two cats share it. The sisal naturally frays after heavy use which is normal and expected — still fully functional after two months of daily use.',
      date: 'May 25, 2026',
      ts: 1748131200000,
    },
  ],

  'dog-treat-training-pouch': [
    {
      name: 'Brian T.',
      rating: 5,
      text: 'Training my puppy went from frustrating to fun once I got this pouch. The magnetic closure means treats are out in under a second and she responds so much faster when the reward is immediate. Can\'t train effectively without it now.',
      date: 'June 13, 2026',
      ts: 1749772800000,
    },
    {
      name: 'Nancy H.',
      rating: 5,
      text: 'The magnetic closure is genuinely better than every zipper pouch I\'ve used. One-hand access, closes automatically. I\'ve tried three other brands and this is the first one I plan to reorder when it wears out.',
      date: 'June 2, 2026',
      ts: 1748822400000,
    },
    {
      name: 'Paul G.',
      rating: 4,
      text: 'Good pouch. Holds plenty of treats, clips securely to my belt, and the built-in waste bag dispenser actually works. The magnetic closure stays clean and functional after months of use.',
      date: 'May 18, 2026',
      ts: 1747526400000,
    },
  ],

  'heavy-duty-rope-tug-toy': [
    {
      name: 'Marcus W.',
      rating: 5,
      text: 'My pit mix destroys every toy in minutes. This rope has lasted three weeks and counting — the tight weave is completely different from cheap ropes that unravel immediately. First toy I haven\'t had to replace in months.',
      date: 'June 17, 2026',
      ts: 1750118400000,
    },
    {
      name: 'Rachel P.',
      rating: 5,
      text: 'My vet noticed cleaner teeth at my dog\'s last checkup and asked what changed. It was this rope. My dog chews the knots between tug sessions and it clearly makes a difference.',
      date: 'June 7, 2026',
      ts: 1749254400000,
    },
    {
      name: 'Kevin S.',
      rating: 4,
      text: 'Solid rope that holds up to two labs playing with it simultaneously. Got the XL for our 80-lb lab and the size is right. Natural cotton means no worries about them swallowing dyes or synthetic fibers.',
      date: 'May 30, 2026',
      ts: 1748563200000,
    },
  ],

  'dog-water-bottle-leakproof': [
    {
      name: 'Jamie L.',
      rating: 5,
      text: 'Absolute must-have for walks. My golden drinks from it perfectly, nothing leaks in my bag, and the squeeze mechanism is intuitive from day one. Bought extras for my hiking friends.',
      date: 'June 19, 2026',
      ts: 1750291200000,
    },
    {
      name: 'Sandra K.',
      rating: 5,
      text: 'The retract mechanism is genius — no dripping, no waste. My picky lab actually drinks from it on the go now, which has never happened with other bottles. Light enough to barely notice.',
      date: 'June 10, 2026',
      ts: 1749513600000,
    },
    {
      name: 'Derek M.',
      rating: 4,
      text: 'Works exactly as advertised and the carabiner clip is sturdy. Fill slightly below max in hot weather since pressure builds up — but it functions perfectly in normal conditions.',
      date: 'June 2, 2026',
      ts: 1748822400000,
    },
  ],

  'cat-scratcher-curved-board': [
    {
      name: 'Priya S.',
      rating: 5,
      text: 'My cats completely stopped scratching the sofa the day this arrived. The catnip made them find it immediately — now they fight over who gets to use it. My furniture is finally safe.',
      date: 'June 20, 2026',
      ts: 1750377600000,
    },
    {
      name: 'Andrew T.',
      rating: 5,
      text: 'Best cheap cat product I\'ve ever bought. All three of my cats use it daily and the double-sided design means I\'m not replacing it constantly. Ordered a second for the bedroom.',
      date: 'June 8, 2026',
      ts: 1749340800000,
    },
    {
      name: 'Fiona L.',
      rating: 4,
      text: 'The curve really does make a difference — my cats go at it with way more enthusiasm than the flat boards I\'ve tried. Really effective at redirecting scratching behavior.',
      date: 'May 29, 2026',
      ts: 1748476800000,
    },
  ],

  'pet-nail-grinder-rechargeable': [
    {
      name: 'Theresa B.',
      rating: 5,
      text: 'My dog bit me every time I tried clippers. First session with the grinder he fell asleep. The quiet motor is genuinely game-changing for anxious dogs — I can\'t believe I waited so long to switch.',
      date: 'June 18, 2026',
      ts: 1750204800000,
    },
    {
      name: 'Carlos R.',
      rating: 5,
      text: 'Use it for both my dogs and cats. Takes slightly longer than clippers but the results are smoother and no one panics anymore. By the third session my cat barely flinched. Worth every penny.',
      date: 'June 5, 2026',
      ts: 1749081600000,
    },
    {
      name: 'Linda W.',
      rating: 4,
      text: 'Really good product. Takes a session or two for nervous pets to fully relax with it, but the USB charging is convenient and the 3 grinding ports handle my large shepherd perfectly.',
      date: 'May 27, 2026',
      ts: 1748304000000,
    },
  ],

  'dog-reflective-raincoat': [
    {
      name: 'Natalie P.',
      rating: 5,
      text: 'My beagle comes home completely dry now even in heavy rain. The reflective strips are genuinely bright and the leash hole works perfectly over her harness. Exactly what I needed.',
      date: 'June 15, 2026',
      ts: 1749945600000,
    },
    {
      name: 'Tom J.',
      rating: 4,
      text: 'Really good quality for the price. I sized up one from the chart and it fits my corgi perfectly. Easy to get on and off even when he\'s being wiggly about it.',
      date: 'June 3, 2026',
      ts: 1748995200000,
    },
    {
      name: 'Lisa M.',
      rating: 5,
      text: 'Waterproof and then some — walked through a genuine downpour and my lab was bone dry underneath. The velcro stays secure even with a pulling dog. Exactly what the product promises.',
      date: 'May 25, 2026',
      ts: 1748131200000,
    },
  ],

  'cat-circuit-ball-track': [
    {
      name: 'Sophie T.',
      rating: 5,
      text: 'My cat who never plays is absolutely obsessed with this. She bats at it for 20 minutes straight then naps, which is exactly the routine my vet recommended. Best cat toy I\'ve ever bought.',
      date: 'June 21, 2026',
      ts: 1750464000000,
    },
    {
      name: 'Richard B.',
      rating: 5,
      text: 'All three of my cats use this simultaneously and haven\'t had a single fight over it in two weeks. The three tiers give everyone their own ball — absolute chaos in the best way.',
      date: 'June 11, 2026',
      ts: 1749600000000,
    },
    {
      name: 'Chloe W.',
      rating: 4,
      text: 'Great quality track with a sturdy non-slip base on hardwood. My cats figured it out immediately and it keeps them busy while I work from home. Assembly took under 2 minutes.',
      date: 'June 1, 2026',
      ts: 1748736000000,
    },
  ],
};
