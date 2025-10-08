-- =====================================================
-- PROOF-SAMPLE 데이터베이스 테이블 생성 SQL
-- =====================================================

-- 1. homeworks 테이블 (숙제)
CREATE TABLE homeworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. homework_solutions 테이블 (숙제 풀이)
CREATE TABLE homework_solutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  homework_id UUID NOT NULL REFERENCES homeworks(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. vocabularies 테이블 (단어장)
CREATE TABLE vocabularies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  homework_id UUID NOT NULL REFERENCES homeworks(id) ON DELETE CASCADE,
  word VARCHAR(255) NOT NULL,
  meaning TEXT,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. sentences 테이블 (저장된 문장)
CREATE TABLE sentences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  homework_id UUID NOT NULL REFERENCES homeworks(id) ON DELETE CASCADE,
  sentence TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 인덱스 생성 (성능 최적화)
-- =====================================================

-- homeworks 테이블 인덱스
CREATE INDEX idx_homeworks_created_at ON homeworks(created_at);
CREATE INDEX idx_homeworks_updated_at ON homeworks(updated_at);

-- homework_solutions 테이블 인덱스
CREATE INDEX idx_homework_solutions_homework_id ON homework_solutions(homework_id);
CREATE INDEX idx_homework_solutions_created_at ON homework_solutions(created_at);

-- vocabularies 테이블 인덱스
CREATE INDEX idx_vocabularies_homework_id ON vocabularies(homework_id);
CREATE INDEX idx_vocabularies_word ON vocabularies(word);
CREATE INDEX idx_vocabularies_created_at ON vocabularies(created_at);

-- sentences 테이블 인덱스
CREATE INDEX idx_sentences_homework_id ON sentences(homework_id);
CREATE INDEX idx_sentences_created_at ON sentences(created_at);

-- =====================================================
-- 유니크 제약조건 (중복 방지)
-- =====================================================

-- homework_solutions: 한 숙제당 하나의 풀이만 허용
CREATE UNIQUE INDEX idx_homework_solutions_unique ON homework_solutions(homework_id);

-- vocabularies: 같은 숙제에서 같은 단어는 하나만 허용
CREATE UNIQUE INDEX idx_vocabularies_homework_word ON vocabularies(homework_id, word);

-- sentences: 같은 숙제에서 같은 문장은 하나만 허용
CREATE UNIQUE INDEX idx_sentences_homework_sentence ON sentences(homework_id, sentence);

-- =====================================================
-- 트리거 함수 (updated_at 자동 업데이트)
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- 트리거 생성
-- =====================================================

-- homeworks 테이블 트리거
CREATE TRIGGER update_homeworks_updated_at 
    BEFORE UPDATE ON homeworks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- homework_solutions 테이블 트리거
CREATE TRIGGER update_homework_solutions_updated_at 
    BEFORE UPDATE ON homework_solutions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- vocabularies 테이블 트리거
CREATE TRIGGER update_vocabularies_updated_at 
    BEFORE UPDATE ON vocabularies 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- sentences 테이블 트리거
CREATE TRIGGER update_sentences_updated_at 
    BEFORE UPDATE ON sentences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- RLS (Row Level Security) 정책
-- =====================================================

-- 모든 테이블에 RLS 활성화
-- ALTER TABLE homeworks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE homework_solutions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE vocabularies ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 예시 데이터 삽입 (선택사항)
-- =====================================================

-- 예시 숙제 데이터
-- INSERT INTO homeworks (title, content) VALUES
-- ('영어 문법 연습', '<p>다음 문장을 영어로 번역하세요:</p><p>1. 나는 매일 학교에 간다.</p><p>2. 그녀는 피아노를 잘 친다.</p>'),
-- ('수학 문제', '<p>다음 문제를 풀어보세요:</p><p>1. 2x + 5 = 13</p><p>2. 원의 넓이를 구하세요 (반지름 = 5cm)</p>');

-- =====================================================
-- 테이블 관계도
-- =====================================================
-- homeworks (1) ←→ (N) homework_solutions
-- homeworks (1) ←→ (N) vocabularies  
-- homeworks (1) ←→ (N) sentences
-- =====================================================
