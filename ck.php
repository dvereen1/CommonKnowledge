<?php include_once("headNoNav.php"); ?>
        <title>CK the Quiz</title>
        <link rel = "stylesheet" href = "ck.css">
        <link rel = "stylesheet" href = "/CSS/allProjectsModal.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap" rel="stylesheet">
    </head>
    <body>
        <?php include_once("Classes/projectInfoModal.php");
            createProjectModal("Common Knowledge", $projectModalArr);
        ?>
        <div class ="parent">
        <header >
            <nav>
                <a href="/#portfolio-" class="logo">CK the Quiz</a>
                <ul class = "nav-menu" id = "nav-menu" aria-expanded="false">
                    <li>
                        <a href="https://github.com/dvereen1/CommonKnowledge" class="nav-link">View Code</a>
                    </li>
                    <li>
                        <a href="/#portfolio-" class="nav-link">Portfolio</a>
                    </li>
                </ul>
                <button class = "nav-toggle">
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </nav>
           
        </header>
        <main class = "djv-container">
            <section class = "hero">
                <img class = "hero-pencils" src = "imgs/Image-1.png" alt="pencils">
                <img class = "hero-eraser" src ="imgs/Image-3.png" alt = "eraser">
                <h1>KNOWLEDGE</h1>
                <div class = "hero-content">
                    <div class ="hero-title">
                        <h1>Common</h1>
                        <h1>Knowledge</h1>
                        <p>Test your cognitive prowess.</p>
                        <p>Choose a topic. Topple the questions.</p>
                        <p>Climb the mental mountain.</p>
                    </div>
                </div>
            </section>
            <section class ="quiz-opt-container">
                <div class = "quiz-opt-content">  
                    <div data-index = "0" class = "quiz-opt">
                        <p>Literature</p>
                    </div>
                    <div class = "quiz-opt">
                        <p>Geography</p>
                    </div>
                    <div class = "quiz-opt">
                        <p>Animals</p>
                    </div>
                    <div class = "quiz-opt">
                        <p>Movies</p>
                    </div>
                    <div class = "quiz-opt">
                        <p>Music</p>
                    </div>
                    <div class = "quiz-opt">
                        <p>Sports</p>
                    </div>
                </div>
                <div class="option-bg">
                    <div class="quiz-difficulty option">
                            <div class="option-title">
                                <h2>Difficulty</h2>
                                <i class="fas fa-sort-down"></i>
                            </div>
                            <ul class ="option-list">
                            
                                <li class="option-item" data-option = "difficulty">
                                    <div class ="option-item-content">
                                        <span class = "option-icon">
                                            <i class="fas fa-sort-amount-up-alt"></i>
                                        </span> 
                                        Easy
                                    </div>
                                </li>
                                <li class="option-item" data-option = "difficulty">
                                    <div class="option-item-content">
                                        <span class="option-icon">
                                            <i class="fas fa-sort-amount-up"></i>
                                        </span>
                                        Intermediate
                                    </div>
                                    
                                </li>
                                <li class="option-item" data-option = "difficulty">
                                    <div class="option-item-content">
                                        <span class="option-icon">
                                            <i class="fas fa-sort-amount-down-alt"></i>
                                        </span>
                                        Challenging
                                    </div>
                                </li>
                                <li class="option-item go-back" data-option="difficulty-db">
                                    <div class="option-item-content">
                                        <span class="option-icon">
                                            <i class="fas fa-arrow-circle-left"></i>
                                        </span>
                                        Double Back
                                    </div>
                                </li>
                            </ul>
                    </div>
                    <div class="quiz-amount option">
                                <div class="option-title">
                                    <h2>Amount</h2>
                                    <i class="fas fa-sort-down"></i>
                                </div>
                                <ul class ="option-list">
                                    <li class="option-item" data-option = "amount">
                                        <div class ="option-item-content">
                                            <span class = "option-icon">
                                                <i class="fas fa-sort-amount-up-alt"></i>
                                            </span> 
                                            10
                                        </div>
                                    </li>
                                    <li class="option-item" data-option = "amount">
                                        <div class="option-item-content">
                                            <span class="option-icon">
                                                <i class="fas fa-sort-amount-up"></i>
                                            </span>
                                            20
                                        </div>
                                        
                                    </li>
                                    <li class="option-item" data-option = "amount">
                                        <div class="option-item-content">
                                            <span class="option-icon">
                                                <i class="fas fa-sort-amount-down-alt"></i>
                                            </span>
                                            30
                                        </div>
                                    </li>
                                    <li class="option-item go-back" data-option="amount-db">
                                        <div class="option-item-content">
                                            <span class="option-icon">
                                                <i class="fas fa-arrow-circle-left"></i>
                                            </span>
                                            Double Back
                                        </div>
                                </li>
                                </ul>
                    </div>
                    <div class = "quiz-details option">
                        <div class="option-title">
                            <h2>You Ready?</h2>
                            <i class="fas fa-thumbs-up"></i>
                        </div>
                        <div class = "selected-option-cont">
                            <div class = "selected-option">
                                <h3>Category: </h3>
                                <p class = "selected-category">Animals</p>
                            </div>
                            <div class = "selected-option">
                                <h3>Difficulty: </h3>
                                <p class = "selected-difficulty">Easy</p>
                            </div>
                            <div class = "selected-option">
                                <h3>Amount: </h3>
                                <p class = "selected-amount">10</p>
                            </div> 
                            <div class = "btn-grp">
                                <button class="take-quiz-btn">
                                    <div class="btn-content">
                                        <span class="option-icon">
                                            <i class="fas fa-space-shuttle"></i>
                                        </span>
                                       Launch
                                    </div>
                                </button>
                                <button class="go-back-btn">
                                    <div class="btn-content">
                                        <span class="option-icon">
                                                    <i class="fas fa-arrow-circle-left"></i>
                                        </span>
                                        Double Back
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <script src ="ck.js"></script>
        <script src = "/JS/allProjectsModal.js"></script>
    </body>
</html>