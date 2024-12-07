import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

interface SectionScore {
    Easy: number;
    Medium: number;
    Hard: number;
    total: number;
}

interface TopicWiseScores {
    [topic: string]: number;
}

interface Result {
    testID: string;
    testName: string;
    totalScore: number;
    quantScore: number;
    verbalScore: number;
    sectionWiseScores: {
        Quant: SectionScore;
        Verbal: SectionScore;
    };
    topicWiseScores: TopicWiseScores;
    submittedAt: string;
}

const TestResultPage: React.FC = () => {
    const { testID } = useParams<{ testID: string }>(); // Get testID from URL
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Result>(`/api/results/${testID}`);
                setResult(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Error fetching result.');
                setLoading(false);
            }
        };

        fetchResult();
    }, [testID]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
                <Typography>Loading results...</Typography>
            </Container>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Results for Test: {result?.testName} (ID: {result?.testID})
            </Typography>
            <Typography variant="body1">
                <strong>Total Score:</strong> {result?.totalScore}
            </Typography>
            <Typography variant="body1">
                <strong>Quant Score:</strong> {result?.quantScore}
            </Typography>
            <Typography variant="body1">
                <strong>Verbal Score:</strong> {result?.verbalScore}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Section-Wise Scores:
            </Typography>
            <div>
                <Typography variant="body1"><strong>Quant:</strong></Typography>
                <ul>
                    <li>Easy: {result?.sectionWiseScores.Quant.Easy}</li>
                    <li>Medium: {result?.sectionWiseScores.Quant.Medium}</li>
                    <li>Hard: {result?.sectionWiseScores.Quant.Hard}</li>
                    <li>Total: {result?.sectionWiseScores.Quant.total}</li>
                </ul>
                <Typography variant="body1"><strong>Verbal:</strong></Typography>
                <ul>
                    <li>Easy: {result?.sectionWiseScores.Verbal.Easy}</li>
                    <li>Medium: {result?.sectionWiseScores.Verbal.Medium}</li>
                    <li>Hard: {result?.sectionWiseScores.Verbal.Hard}</li>
                    <li>Total: {result?.sectionWiseScores.Verbal.total}</li>
                </ul>
            </div>

            <Typography variant="h6" gutterBottom>
                Topic-Wise Scores:
            </Typography>
            <ul>
                {result &&
                    Object.entries(result.topicWiseScores).map(([topic, score]) => (
                        <li key={topic}>
                            {topic}: {score}
                        </li>
                    ))}
            </ul>

            <Typography variant="body1">
                <strong>Submitted At:</strong> {new Date(result?.submittedAt || '').toLocaleString()}
            </Typography>
        </Container>
    );
};

export default TestResultPage;